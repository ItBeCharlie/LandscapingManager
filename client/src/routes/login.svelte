<script lang="ts">
	import { api } from '../models/myFetch';
	import Header from '../components/Header.svelte';
	import { dummyUser } from '../models/User';

	const loginButtonPressed = async (ev: any) => {
		let form: any = {
			username: '',
			password: ''
		};
		const formData = new FormData(ev.target);
		formData.forEach((value, key) => (form[key] = value));
		// dummyUser.username = form.username;
		// localStorage.setItem('user', JSON.stringify(dummyUser));
		// console.log(form);

		let res = await api('users/login', form, 'POST');
		// console.log(res);

		if (res.error) alert(res.error);
		else {
			console.log(res);
			localStorage.setItem('user', JSON.stringify(res));
			window.location.href = '/';
		}
	};

	// $: console.log(form);
</script>

<Header title="Login" />

<div class="container">
	<form on:submit|preventDefault={loginButtonPressed}>
		<!-- Username input -->
		<div class="form-outline mb-4">
			<input type="text" name="username" class="form-control" required />
			<label class="form-label" for="username">Username</label>
		</div>

		<!-- Password input -->
		<div class="form-outline mb-4">
			<input type="password" name="password" class="form-control" required />
			<label class="form-label" for="password">Password</label>
		</div>

		<!-- Submit button -->
		<input type="submit" class="btn btn-primary btn-block mb-4" value="Sign In" />

		<!-- Register buttons -->
		<div class="text-center">
			<p>Don't have an account? <a href="register">Register</a></p>
		</div>
	</form>
</div>
