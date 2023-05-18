![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ahmeddots/tryresult/ci.yaml)
![NPM bundle size](https://img.shields.io/bundlephobia/min/tryresult?color=royalblue)
![npm](https://img.shields.io/npm/v/tryresult?label=version&color=blue)

### TryResult

📛 A typescript library to get rid of try catches, and replace them with result types, inspired by Rust and Go error handling.

#### Install

As with any npm package:
```sh
npm i tryresult
```

#### Usage

Wrap your async function with ```resultAsync```:
```typescript
let users = await resultAsync(
	// get a list of users from the database
	const allUsers = await db.user.findMany()
);
```
This will make the ```users``` variable be of type ```T | Error```, meaning it is a union can be either a value or an error (a union of types).

Then check for error in the variable with ```hasError```, and then handle the error:
```typescript
if (hasError(users)) {
	return "Could not get users from db";
}
```
This also works as a type guard and all code after the ```hasError``` will consider result's type to be ```T```.

To see the library used in a project, checkout out [ahmeddots/oswald](https://github.com/ahmeddots/oswald).
