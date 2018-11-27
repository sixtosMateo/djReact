# This tutorial can be found at the following link https://www.youtube.com/watch?v=uZgRbnIsgrA

# other resources
  # https://ant.design/components/list/
  # https://github.com/ottoyiu/django-cors-headers
# https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/Installation.md
# https://alligator.io/react/axios-react/
# http://v1k45.com/blog/modern-django-part-1-setting-up-django-and-react/
# https://www.django-rest-framework.org/tutorial/1-serialization/
# https://automationpanda.com/2018/02/08/django-projects-in-visual-studio-code/

Backend
  Django framework
    $ virtualenv env
    $ source env/bin/activate
    $ pip3 install django
    $ pip3 install djangorestframework
    $ django-admin startproject <project-name>

  <project-name>
    settings.py

      # add these lines in your project settings.py file:
      $ INSTALLED_APPS{
      $  '...',
      $  'rest_framework',
      $  '<src-name>',
      $ }

      # add these lines of code at the bottom settings.py file:
      $ REST_FRAMEWORK = {
      $    # Use Django's standard `django.contrib.auth` permissions,
      $    # or allow read-only access for unauthenticated users.
      $    'DEFAULT_PERMISSION_CLASSES': [
      $        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
      $    ]
      $ }

    urls.py

      # add these lines in your project urls.py file
      $ from django.urls import path, include
      $ path('api-auth/', include('rest_framework.urls')),

  <src-name>
    # models.py
    #  Article
    #    title - CharField
    #    content - TextField

    # Terminal under same directory of manage.py insert       
    #  anytime you change your models:
      $ python3 manage.py makemigrations
      $ python3 manage.py migrate

    admin.py
      # insert lines to register models to Django admin
        $ from .models import Article
        $ admin.site.register(Article)

    # mkdir api folder
    <api-folder-name>
      # serializers - converting json data into a model
      # create __init__.py file
      # create serializers.py file
      # create views.py file
      # create urls.py file

      serializers.py
      # insert these lines for your model (ex: Article)

      $ from rest_framework import serializers
      $ from <src-name>.models import Article

      $ class ArticleSerializer(serializers.ModelSerializer):
      $    class Meta:
      $        model = Article
      $        fields = ('id','title', 'content')

      views.py
        # insert these lines of code based on ModelSerializer # created
          $ from rest_framework.generics import ListAPIView, RetrieveAPIView
          $ from <src-name>.models import Article
          $ from .serializers import ArticleSerializer

          $ class ArticleListView(ListAPIView):
          $    queryset = Article.objects.all()
          $    serializer_class = ArticleSerializer

          $  class ArticleDetailView(RetrieveAPIView):
          $      queryset = Article.objects.all()
          $      serializer_class = ArticleSerializer

      urls.py
        $ from django.urls import path
        $ from .views import ArticleListView, ArticleDetailView

        $ urlpatterns = [
        $    path('', ArticleListView.as_view()),
        $    path('<pk>', ArticleDetailView.as_view()),

      # in-order to include api/urls.py link path under <project-name>/urls.py
        # add this line in <project-name>/urls.py file:
        $ path('api/', include('<src-name>.api.urls'))

Frontend
  React
    $ sudo npm install -g create-react-app
    $ create-react-app <project-name>
    $ cd <project-name>
    $ npm run eject
    $ npm run start



    <project-name>
      <src>
        # ant.design is similar to material UI design a component library that has been styled already
        # install ant.design
          $ npm install antd --save or
          $ yarn add antd


        App.js
          # add this line on top:
            $ import 'antd/dist/antd.css';

        $ mkdir components
        $ mkdir containers

        <containers>
          # create Layout.js
          # go to ant.design webpage and copy code of layout preference
          # paste code in Layout.js file
          # Remove $ 'ReactDOM.render(' and $ ', mountNode)' since we are not rendering to Dom
          # add this line:
            $ import React from 'react';

          # add these lines:
            $ const CustomLayout = (props) => {
            $  return(
            $     # here place the Layout component code
            $    );} export default CustomLayout;

          # inside the Layout component and inside Content component there is this line:
            $ <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>

          # erase 'Content' from the div tags and insert:
            $ {props.children}

          # renders whatever is being passed into Layout component

        App.js
          # add this line to import CustomLayout:
            $ import CustomLayout from './containers/Layout';

          # add these tags to display the CustomLayout into your app:
            $ <CustomLayout>
            $ </CustomLayout>

        <components>
          # create a new file Article.js
          # go to ant.design webpage and choose a list design and copy the code
          # add these lines of code:
            $ import React from 'react'
            $ const Articles = (props)=>{
            $  return(
                # paste the List design code here but
                # remove $ 'ReactDOM.render(' and $ ', mountNode)'
            $  );}
            $ export default Articles;

        <containers>
           # create ArticleListView.js file
           # create ArticleDetailView.js file

          ArticleDetailView.js
            # add these lines to ArticleDetailView.js:
              $ import React from 'react';
              $ import Articles from '../components/Article'
              $ class ArticleList extends React.Component{

              $   render(){
              $     return()
              $   }
              $ }
              $ export default ArticleList;

         # In-order to display data from our server, we need to get the data
            # so install package Axios

         # Axios is a promise based and thus we can take advantage of
            # async and await for more readable asynchronous code
	       # sort of like ajax that you can make requests to post or get from server

         # In Terminal under same directory as <project-name>
          $ npm install axios --save
          $ yarn add axios

         # take all data coming from API and display that as the data in Article component

         Article.js
          # change the value data source from listData to:
          $ dataSource={props.data}
          # this GET data parameters that comes though Article component using props

         App.css
          # delete all code in the file

         ArticleListView.js
          $ import axios from 'axios';

          # Inside of Class ArticleList copy this:

          $  state ={
          $    articles:[]
          $  }
          $  componentDidMount(){
          $    axios.get('<api-url>')
          $      .then(res => {
          $        this.setState({
          $          articles: res.data
          $        });
          $      })
          $  }

          # axios gets data and set it to state

          # inside our render() methos add this line:
            $ (<Articles data={this.state.articles}/>)

          # Sending state data into articles component base on the axios GET request

  # Navigate to Backend directory
    <project-name>
       settings.py

         # specify headers to make requests to server
            # need a package cors headers seperate package to rest-framework

         # In terminal nagivate to backend directory and type:
            $ source venv/bin/activate
            $ cd <src-name>
            $ pip3 install django-cors-headers

         # add this to INSTALLED_APPS={
           ...,
           'corsheaders',
         }

         # add this to MIDDLEWARE = [
         ...,
         'corsheaders.middleware.CorsMiddleware',
         ]

         # at the bottom add this:
           $ CORS_ORIGIN_ALLOW_ALL = True

  # Navigate to Frontend directory
      # react-router-dom - used for redirecting inside react app
      # inside terminal Navigate to <project-name>
        # install react-router-dom type:
          $ npm install react-router-dom
          # or
          $ yarn add react-router-dom

      <project-name>
        <src>
          # defines all roots that needs to be display or contain
          # create routes.js
            # copy these lines of code into routes.js file
              $ import React from 'react';
              $ import { Route } from 'react-router-dom';
              $ import ArticleList from './containers/ArticleListView'
              $ import ArticleDetail from './containers/ArticleDetailView'

              # be a stateless component
              $ const BaseRouter = () =>(
                <div>
                  <Route exact path='/' component={ArticleList}/>
                  # :articleID indicates this a parameter (can be any name)
                  <Route exact path='/:articleID' component={ArticleDetail}/>
                </div>
                );

              $ export default BaseRouter;

        App.js
          # add these lines to App.js at top:
            $ import { BrowserRouter as Router } from 'react-router-dom';
            $ import BaseRouter from './routes';

          # the Router from import evaluates all roots that are available & depending on the current path. In other words determining what needs to be render

          # edit render portion by adding the Router component should look like this:
            $ <Router>
            $ <CustomLayout>
            $  <BaseRouter/>
            $ </CustomLayout>
            $ </Router>

        ArticleDetailView.js
          # paste this code:
            $ import React from 'react';
            $ import axios from 'axios';

            # this a build in component from ant.design
            $ import { Card } from 'antd';

            $ class ArticleDetail extends React.Component{

              # since we are viewing details of specific Article is should
              # state variable should be represent as a object not array
            $   state ={
            $     article:{}
            $   }

            $   componentDidMount(){
              # querying with primary key of article
            $     const articleID = this.props.match.params.articleID;
            $     axios.get(`http://127.0.0.1:8000/api/${articleID}`)
            $       .then(res => {
            $         this.setState({
            $           article: res.data
            $         });
            $       })
            $   }
            $    render(){
              # output card from article of state
            $      return(
            $      <Card title={this.state.article.title}>
            $         <p>{this.state.article.content}</p>
            $      </Card>
            $    )
            $    }
            $ }
            $ export default ArticleDetail;

        Layout.js
          # add this line at the top
            $ import { Link } from 'react-router-dom';

          # wrap the link component on navigation component
            # edit Breadcrumb component list like this:
              <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>

        Article.js

          # change href tag from title to this:
            ArticleSerializer from our django backend
            title={<a href={`/${item.id}`}>{item.title}</a>}


      ArticleListView
          # Delete this from ArticleListView.js not required:
            $ const listData = [];
            $ for (let i = 0; i < 23; i++) {
            $  listData.push({
            $    href: 'http://ant.design',
            $    title: `ant design part ${i}`,
            $    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            $    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            $    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            $  });
            $ }

  # Navigate to Backend directory
    <project-name>
      <src-name>
          <api-folder-name>
              views.py
                # putting all generics views into one view
                # change your views.py file to this:
                  $ from articles.models import Article
                  $ from .serializers import ArticleSerializer
                  $ from rest_framework import viewsets

                  $ class ArticleViewSet(viewsets.ModelViewSet):
                  $    serializer_class = ArticleSerializer
                  $     queryset = Article.objects.all()

              urls.py
                # router handles your ArticleViewSet into on url pattern
                # change your urls.py file to this:
                  $ from articles.api.views import ArticleViewSet
                  $ from rest_framework.routers import DefaultRouter

                  $ router = DefaultRouter()
                  $ router.register(r'', ArticleViewSet, base_name='articles')
                  $ urlpatterns = router.urls

                  # Navigate to Backend directory
                    <project-name>

  # Navigate to Backend directory
     <project-name>
        <src>
          <components>
              # create a Form.js
              # add these line of codes to Form.js file
                $  import React from 'react';
                $  import { Form, Input, Button  } from 'antd';
                $  import axios from 'axios';

                $  const FormItem = Form.Item;

                  // CustomForm - used for create view and update
                  // what we need to do for this to work we need to handle when form is submitted
                  // since we are using it in more than one view need to specify when we are
                      // posting something  and when to update something

                  // htmltype="submit" -> indicates that button is submit type
                  // type="primary" -> is for styling

                  $ class CustomForm extends React.Component {
                    // requestType define whether it's a POST or GET

                  $  handleFormSubmit = (event, requestType, articleID) =>{

                      // // so that the form does not submit the page and page doesnt reload
                      // event.preventDefault();

                  $    const title = event.target.elements.title.value;
                  $    const content = event.target.elements.content.value;

                  $    switch (requestType){

                  $      case 'post':
                  $        return axios.post('http://127.0.0.1:8000/api/',{
                  $          title:title,
                  $          content:content
                  $        })
                  $        .then(res => console.log(res))
                  $        .catch(error => console.log(error));

                  $      case'put':
                  $        return axios.put(`http://127.0.0.1:8000/api/${articleID}/`,{
                  $          title:title,
                  $          content:content
                  $        })
                  $        .then(res => console.log(res))
                  $        .catch(error => console.log(error));
                  $    }
                  $  }

                  $ render() {
                  $   return (
                  $     <div>
                  $       <Form onSubmit={(event) => this.handleFormSubmit(
                  $          event,
                  $          this.props.requestType,
                  $          this.props.articleID)}>
                  $         <FormItem label="Title">
                  $           <Input name="title" placeholder="Put a title here" />
                  $         </FormItem>
                  $         <FormItem label="Content">
                  $           <Input name="content"  placeholder="Put content here" />
                  $         </FormItem>
                  $         <FormItem>
                  $           <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                  $         </FormItem>
                  $       </Form>
                  $     </div>
                  $   );
                  $ }
                  $ }

                  $ export default CustomForm;

          <containers>
            ArticleListView.js
              # add these lines of code
                $ import CustomForm from '../components/Form';

              # change these lines in return()
                $ <div>
                $  <Articles data={this.state.articles}/>
                $  <br />
                $  <h2>Create an article</h2>
                $  <CustomForm
                $     requestType="post"
                $     articleID={null}
                $     btnText="Create"/>
                $ </div>

            ArticleDetailView.js
              # add these lines of code at top:
                $ import axios from 'axios';
                $ import { Button, Card } from 'antd';
                $ import CustomForm from '../components/Form';

              # add these lines of code at the bottom of Card:
              # all of these have to be tags have to be in one <div>
                $ <br />

                $ <h2>Update an article</h2>
                $ <CustomForm
                $ requestType="put"
                $ articleID={this.props.match.params.articleID}
                $ btnText="Update"/>

                $ <form onSubmit={this.handleDelete}>
                $   <Button type="danger" htmlType="submit">Delete</Button>
                $ </form>

          # this code changes should be able to connect to server(api urls) but in django setttigs.py
            # django REST_FRAMEWORK permissions must be temporary change so that anyone can make changes
  # adding authentication
    # start from frontend directory

    
