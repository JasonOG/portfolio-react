import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ContactFormValues } from 'types';

const ContactForm: React.FC = () => {
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().required('Message is required')
  });

  // Initialize formik
  const formik = useFormik<ContactFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Replace this with your form submission logic
        // For now, we'll just simulate a submission with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Redirect to success page after form submission
        navigate('/success');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  });

  return (
    <form className="row g-3" onSubmit={formik.handleSubmit}>
      <input type="text" name="_honey" style={{ display: 'none' }} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://jasonog.github.io/portfolio/success.html" />
      
      <div className="col-md-6">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input
          type="text"
          className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
          id="firstName"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="invalid-feedback">{formik.errors.firstName}</div>
        )}
      </div>
      
      <div className="col-md-6">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input
          type="text"
          className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="invalid-feedback">{formik.errors.lastName}</div>
        )}
      </div>
      
      <div className="col-md-8">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="invalid-feedback">{formik.errors.email}</div>
        )}
      </div>
      
      <div className="col-md-4">
        <label htmlFor="phone" className="form-label">Phone (optional)</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
      </div>
      
      <div className="col-md-12">
        <label htmlFor="message" className="form-label">Your message</label>
        <textarea
          className={`form-control ${formik.touched.message && formik.errors.message ? 'is-invalid' : ''}`}
          id="message"
          name="message"
          rows={4}
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
        {formik.touched.message && formik.errors.message && (
          <div className="invalid-feedback">{formik.errors.message}</div>
        )}
      </div>
      
      <div className="col-md-12" style={{ textAlign: 'center' }}>
        <button
          type="submit"
          className="shadow btnEmail btn-primary rounded-pill btn-lg"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;