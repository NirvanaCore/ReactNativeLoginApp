const express = require('express');
const router = express.Router();

//mongodb user model
const User = require('../models/User');

//password handler
const bcrypt = require('bcrypt');

//Signup
router.post('/signup', (req, res) => {
	let { name, email, password } = req.body;
	name = name.trim();
	email = email.trim();
	password = password.trim();

	if (name == '' || (email == '') | (password == '')) {
		res.json({
			status: 'FAILED',
			message: 'Empty input Fields!',
		});
	} else if (!/^[a-zA-Z ]*$/.test(name)) {
		res.json({
			status: 'FAILED',
			message: 'Invalid name entered',
		});
	} else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
		res.json({
			status: 'FAILED',
			message: 'Invalid email entered',
		});
	} else if (password.length < 6) {
		res.json({
			status: 'FAILED',
			message: 'password is too short!',
		});
	} else {
		//checking if user already exists
		User.find({ email })
			.then((result) => {
				if (result.length) {
					//user exist
					res.json({
						status: 'FAILED',
						message: 'User Already exists!',
					});
				} else {
					//try to create user

					//password handling
					const saltRound = 10;
					bcrypt
						.hash(password, saltRound)
						.then((hashedPassword) => {
							const newUser = new User({
								name,
								email,
								password: hashedPassword,
							});
							newUser
								.save()
								.then((result) => {
									res.json({
										status: 'SUCCESS',
										message: 'Register Successfully',
										date: result,
									});
								})
								.catch((err) => {
									res.json({
										status: 'FAILED',
										message: 'An error Occur while saving user info',
									});
								});
						})
						.catch((err) => {
							res.json({
								status: 'FAILED',
								message: 'An error Occur while hashing password',
							});
						});
				}
			})
			.catch((err) => {
				console.log(err);
				res.json({
					status: 'FAILED',
					message: 'An error Occur while checking if user already exist',
				});
			});
	}
});

//Signin
router.post('/signin', (req, res) => {
	let { email, password } = req.body;
	email = email.trim();
	password = password.trim();

	if (email == '' || password == '') {
		res.json({
			status: 'FAILED',
			message: 'Empty Credentials!',
		});
	} else {
		//check if user  exist
		User.find({ email })
			.then((data) => {
				if (data.length) {
					const hashedPassword = data[0].password;
					bcrypt
						.compare(password, hashedPassword)
						.then((result) => {
							if (result) {
								res.json({
									status: 'SUCCESS',
									message: 'Signin Successfully',
									date: data,
								});
							} else {
								res.json({
									status: 'FAILED',
									message: 'Invalid password entered!',
								});
							}
						})
						.catch((err) => {
							console.log(err);
							res.json({
								status: 'FAILED',
								message: 'Error occurred while comparing Password',
							});
						});
				} else {
					res.json({
						status: 'FAILED',
						message: 'Invalid Credentials',
					});
				}
			})
			.catch((err) => {
				res.json({
					status: 'FAILED',
					message: 'An error occurred while checking for credentials',
				});
			});
	}
});

module.exports = router;
