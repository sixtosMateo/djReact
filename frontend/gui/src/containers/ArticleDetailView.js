import React from 'react';
import axios from 'axios';

import { Card } from 'antd';

import CustomForm from '../components/Form';

class ArticleDetail extends React.Component{
  state ={
    article:{}
  }
  componentDidMount(){
    const articleID = this.props.match.params.articleID;
    axios.get(`http://127.0.0.1:8000/api/${articleID}/`)
      .then(res => {
        this.setState({
          article: res.data
        });
        // console.log(res.data);
      })
  }
   render(){
     return(
       <div>
         <Card title={this.state.article.title}>
            <p>{this.state.article.content}</p>
         </Card>
         <br />
         <h2>Update an article</h2>
         <CustomForm/>
      </div>
   )
   }
}
export default ArticleDetail;
