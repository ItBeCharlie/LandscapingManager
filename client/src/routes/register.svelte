<script lang="ts">
	import Header from '../components/Header.svelte';
	import { dummyUser } from '../models/User';
	import { api } from '../models/myFetch';

	const loginButtonPressed = async (ev: any) => {
		let form: any = {
			firstname: '',
			lastname: '',
			username: '',
			password: '',
			email: '',
			dob: ''
		};
		const formData = new FormData(ev.target);
		formData.forEach((value, key) => (form[key] = value));
		// dummyUser.username = form.username;
		// localStorage.setItem('user', JSON.stringify(dummyUser));
		// console.log(form);
		// console.log(form.dob);
		form.dob = Math.floor(new Date(form.dob).getTime() / 1000);
		// console.log(form.dob);
		// console.log(Math.floor(form.dob.getTime() / 1000));

		let res = await api(
			'users/register',
			{ ...form, name: `${form.firstname} ${form.lastname}` },
			'POST'
		);
		// console.log(res);
		if (res.error) alert(res.error);
		else window.location.href = '/login';
	};
</script>

<Header title="Register" />

<div class="container">
	<form on:submit|preventDefault={loginButtonPressed}>
		<!-- Firstname input -->
		<div class="form-outline mb-4">
			<input type="text" name="firstname" class="form-control" required />
			<label class="form-label" for="firstname">First Name</label>
		</div>

		<!-- Lastname input -->
		<div class="form-outline mb-4">
			<input type="text" name="lastname" class="form-control" required />
			<label class="form-label" for="lastname">Last Name</label>
		</div>

		<!-- Username input -->
		<div class="form-outline mb-4">
			<input type="text" name="username" class="form-control" required />
			<label class="form-label" for="username">Username</label>
		</div>

		<!-- Birthdate input -->
		<div class="form-outline mb-4">
			<input type="date" name="dob" class="form-control" required />
			<label class="form-label" for="dob">Birthdate</label>
		</div>

		<!-- Email input -->
		<div class="form-outline mb-4">
			<input type="email" name="email" class="form-control" required />
			<label class="form-label" for="email">Email address</label>
		</div>

		<!-- Password input -->
		<div class="form-outline mb-4">
			<input type="password" name="password" class="form-control" required />
			<label class="form-label" for="password">Password</label>
		</div>

		<!-- 2 column grid layout for inline styling -->
		<!-- <div class="row mb-4">
			<div class="col d-flex justify-content-center"> -->
		<!-- Checkbox -->
		<!-- <div class="form-check">
					<input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
					<label class="form-check-label" for="form2Example31"> Remember me </label>
				</div> -->
		<!-- </div> -->

		<!-- <div class="col"> -->
		<!-- Simple link -->
		<!-- <a href="#!">Forgot password?</a>
			</div> -->
		<!-- </div> -->

		<!-- Submit button -->
		<input type="submit" class="btn btn-primary btn-block mb-4" value="Register" />
	</form>
</div>
