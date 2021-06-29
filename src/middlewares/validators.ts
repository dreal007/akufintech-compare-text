
/**
 * @description User request validator schema
 */

const createUserSchema = {
  displayName : {
      in : ['body'],
      isString: true,
      matches: /[a-zA-Z\-\s]/,
      errorMessage: 'Not a valid display name'
  },

  password: {
      in: ['body'],
      isString: true,
      matches: /[a-zA-Z\-\s]/,
      errorMessage: 'Not a valid password'
  },

  email: {
      in: ['body'],
      isEmail: true,
      errorMessage: 'Not a valid email'
  },

}

const getUserSchema = {
  password: {
      in: ['body'],
      isString: true,
      matches: /[a-zA-Z\-\s]/,
      errorMessage: 'Not a valid password'
  },

  email: {
      in: ['body'],
      isEmail: true,
      errorMessage: 'Not a valid email'
  },

}

const compareTextSchema = {
  first_student_name: {
      in: ['body'],
      isString: true,
      matches: /[a-zA-Z\-\s]/,
      errorMessage: 'First student name is required '
  },
  
  first_student_text: {
      in: ['body'],
      isString: true,
      matches: /[a-zA-Z\-\s]/,
      errorMessage: 'First student text is required '
  },
  
  second_student_name: {
      in: ['body'],
      isString: true,
      matches: /[a-zA-Z\-\s]/,
      errorMessage: 'Second student name is required '
  },
  
  second_student_text: {
      in: ['body'],
      isString: true,
      matches: /[a-zA-Z\-\s]/,
      errorMessage: 'Second student text is required '
  },

}

const getComparisonDetailsSchema = {
  comparison_id: {
      in: ['params'],
      isString: true,
      matches: /[a-zA-Z\-\s]/,
      errorMessage: 'comparison id is required as params'
  }

}

export { 
  createUserSchema,
  getUserSchema,
  compareTextSchema,
  getComparisonDetailsSchema
}