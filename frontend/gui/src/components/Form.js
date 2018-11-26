import React from 'react';
import { Form, Input, Button  } from 'antd';

const FormItem = Form.Item;

// CustomForm - used for create view and update
// what we need to do for this to work we need to handle when form is submitted
// since we are using it in more than one view need to specify when we are
    // posting something  and when to update something
    
class CustomForm extends React.Component {

 render() {
   return (
     <div>
       <Form>
         <FormItem label="Title">
           <Input placeholder="Put a title here" />
         </FormItem>
         <FormItem label="Content">
           <Input placeholder="Put content here" />
         </FormItem>
         <FormItem>
           <Button type="primary">Submit</Button>
         </FormItem>
       </Form>
     </div>
   );
 }
}

export default CustomForm;
