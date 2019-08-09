import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data:any){
	interface Error{
		[propName:string]:any;
	}
    let errors:Error = {};
    
	if (Validator.isEmpty(data.username)) {
		errors.username = 'Username is required';
	}
	if (Validator.isEmpty(data.fullName)) {
		errors.fullName = 'Fullname is required';
	}
	if (Validator.isEmpty(data.email)) {
	    errors.email = 'Email is required';
	}
	if (!Validator.isEmail(data.email)) {
	 	errors.email = 'Email is invalid';
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password is required';
	}
	if (Validator.isLength(data.password, 6,undefined)) {
		errors.password = 'Password field must be at least 6 character long';
	}
	
	return{
		errors,
		isValid:isEmpty(errors)
	}
}