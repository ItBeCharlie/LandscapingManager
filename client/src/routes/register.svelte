<script lang="ts">
	import Header from '../components/Header.svelte';
	import { dummyUser } from '../models/User';
	let form = {
		firstname: '',
		lastname: '',
		username: '',
		password: '',
		email: '',
		birthdate: ''
	};

	$: console.log(form);
</script>

<Header title="Register" />

<div class="container">
	<form>
		<!-- Firstname input -->
		<div class="form-outline mb-4">
			<input
				type="text"
				id="form_firstname"
				pattern="[a-zA-Z' ]"
				class="form-control"
				required
				bind:value={form.firstname}
			/>
			<label class="form-label" for="form_firstname">First Name</label>
		</div>

		<!-- Lastname input -->
		<div class="form-outline mb-4">
			<input
				type="text"
				id="form_lastname"
				pattern="[a-zA-Z' ]"
				class="form-control"
				required
				bind:value={form.lastname}
			/>
			<label class="form-label" for="form_lastname">Last Name</label>
		</div>

		<!-- Username input -->
		<div class="form-outline mb-4">
			<input
				type="text"
				id="form_username"
				class="form-control"
				required
				bind:value={form.username}
			/>
			<label class="form-label" for="form_username">Username</label>
		</div>

		<!-- Birthdate input -->
		<div class="form-outline mb-4">
			<input
				type="date"
				id="form_birthdate"
				class="form-control"
				required
				bind:value={form.birthdate}
			/>
			<label class="form-label" for="form_birthdate">Birthdate</label>
		</div>

		<!-- Email input -->
		<div class="form-outline mb-4">
			<input type="email" id="form_email" class="form-control" required bind:value={form.email} />
			<label class="form-label" for="form_email">Email address</label>
		</div>

		<!-- Password input -->
		<div class="form-outline mb-4">
			<input
				type="password"
				id="form_password"
				class="form-control"
				required
				bind:value={form.password}
			/>
			<label class="form-label" for="form_password">Password</label>
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
		<button type="button" class="btn btn-primary btn-block mb-4">Register</button>
	</form>
</div>
