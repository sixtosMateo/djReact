import React from 'react';
import { Form, Input, Button  } from 'antd';

const FormItem = Form.Item;

// CustomForm - used for create view and update
// what we need to do for this to work we need to handle when form is submitted
// since we are using it in more than one view need to specify when we are
    // posting something  and when to update something

// htmltype="submit" -> indicates that button is submit type
// type="primary" -> is for styling

class CustomForm extends React.Component {

  handleFormSubmit = (event) =>{
    // so that the form does not submit the page and page doesnt reload
    event.preventDefault();
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;

    console.log(title,content);
  }


 render() {
   return (
     <div>
       <Form onSubmit={this.handleFormSubmit}>
         <FormItem label="Title">
           <Input name="title" placeholder="Put a title here" />
         </FormItem>
         <FormItem label="Content">
           <Input name="content"  placeholder="Put content here" />
         </FormItem>
         <FormItem>
           <Button type="primary" htmlType="submit">Submit</Button>
         </FormItem>
       </Form>
     </div>
   );
 }
}

export default CustomForm;
