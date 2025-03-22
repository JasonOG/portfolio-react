"use strict";(self.webpackChunkportfolio_react=self.webpackChunkportfolio_react||[]).push([[849],{849:(e,a,s)=>{s.r(a),s.d(a,{default:()=>c});s(43);var l=s(228),i=s(511),r=s(899),t=s(216),n=s(579);const o=()=>{const e=(0,t.Zp)(),a=r.Ik({firstName:r.Yj().required("First name is required"),lastName:r.Yj().required("Last name is required"),email:r.Yj().email("Invalid email address").required("Email is required"),message:r.Yj().required("Message is required")}),s=(0,i.Wx)({initialValues:{firstName:"",lastName:"",email:"",phone:"",message:""},validationSchema:a,onSubmit:async a=>{try{await new Promise((e=>setTimeout(e,1e3))),e("/success")}catch(s){console.error("Error submitting form:",s)}}});return(0,n.jsxs)("form",{className:"row g-3",onSubmit:s.handleSubmit,children:[(0,n.jsx)("input",{type:"text",name:"_honey",style:{display:"none"}}),(0,n.jsx)("input",{type:"hidden",name:"_captcha",value:"false"}),(0,n.jsx)("input",{type:"hidden",name:"_next",value:"https://jasonog.github.io/portfolio/success.html"}),(0,n.jsxs)("div",{className:"col-md-6",children:[(0,n.jsx)("label",{htmlFor:"firstName",className:"form-label",children:"First Name"}),(0,n.jsx)("input",{type:"text",className:"form-control "+(s.touched.firstName&&s.errors.firstName?"is-invalid":""),id:"firstName",name:"firstName",value:s.values.firstName,onChange:s.handleChange,onBlur:s.handleBlur}),s.touched.firstName&&s.errors.firstName&&(0,n.jsx)("div",{className:"invalid-feedback",children:s.errors.firstName})]}),(0,n.jsxs)("div",{className:"col-md-6",children:[(0,n.jsx)("label",{htmlFor:"lastName",className:"form-label",children:"Last Name"}),(0,n.jsx)("input",{type:"text",className:"form-control "+(s.touched.lastName&&s.errors.lastName?"is-invalid":""),id:"lastName",name:"lastName",value:s.values.lastName,onChange:s.handleChange,onBlur:s.handleBlur}),s.touched.lastName&&s.errors.lastName&&(0,n.jsx)("div",{className:"invalid-feedback",children:s.errors.lastName})]}),(0,n.jsxs)("div",{className:"col-md-8",children:[(0,n.jsx)("label",{htmlFor:"email",className:"form-label",children:"Email"}),(0,n.jsx)("input",{type:"email",className:"form-control "+(s.touched.email&&s.errors.email?"is-invalid":""),id:"email",name:"email",value:s.values.email,onChange:s.handleChange,onBlur:s.handleBlur}),s.touched.email&&s.errors.email&&(0,n.jsx)("div",{className:"invalid-feedback",children:s.errors.email})]}),(0,n.jsxs)("div",{className:"col-md-4",children:[(0,n.jsx)("label",{htmlFor:"phone",className:"form-label",children:"Phone (optional)"}),(0,n.jsx)("input",{type:"text",className:"form-control",id:"phone",name:"phone",value:s.values.phone,onChange:s.handleChange})]}),(0,n.jsxs)("div",{className:"col-md-12",children:[(0,n.jsx)("label",{htmlFor:"message",className:"form-label",children:"Your message"}),(0,n.jsx)("textarea",{className:"form-control "+(s.touched.message&&s.errors.message?"is-invalid":""),id:"message",name:"message",rows:4,value:s.values.message,onChange:s.handleChange,onBlur:s.handleBlur}),s.touched.message&&s.errors.message&&(0,n.jsx)("div",{className:"invalid-feedback",children:s.errors.message})]}),(0,n.jsx)("div",{className:"col-md-12",style:{textAlign:"center"},children:(0,n.jsx)("button",{type:"submit",className:"shadow btnEmail btn-primary rounded-pill btn-lg",disabled:s.isSubmitting,children:s.isSubmitting?"Sending...":"Send"})})]})},m={initial:{opacity:0,y:20},in:{opacity:1,y:0},out:{opacity:0,y:-20}},d={type:"tween",ease:"anticipate",duration:.5},c=()=>(0,n.jsx)(l.P.div,{initial:"initial",animate:"in",exit:"out",variants:m,transition:d,children:(0,n.jsx)("section",{id:"Contact Me",children:(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:"col-md-12",style:{textAlign:"center"},children:[(0,n.jsx)("h1",{children:"Contact Me."}),(0,n.jsx)("h4",{children:"I'd love to hear from you."}),(0,n.jsx)("p",{className:"p2",children:"If you'd like to reach out professionally or you just have some questions about technology in general, I would be delighted to help you!"})]}),(0,n.jsx)("div",{className:"container mt-5",children:(0,n.jsx)(o,{})})]})})})}}]);
//# sourceMappingURL=849.8e712033.chunk.js.map