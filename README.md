![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ahmeddots/tryresult/ci.yaml)
![NPM bundle size](https://img.shields.io/bundlephobia/min/tryresult?color=royalblue)
![npm](https://img.shields.io/npm/v/tryresult?label=version&color=royalblue)
![npm](https://img.shields.io/npm/dm/tryresult?color=gold)

### TryResult

📛 A typescript library to get rid of try catches, and replace them with result types, inspired by Rust and Go error handling.

#### Install

As with any npm package:
```sh
npm i tryresult
```

#### Usage

Import from the package:
```typescript
import { tryAsync, isError } from "tryresult";
```

Wrap your async function with ```tryAsync```:
```typescript
let users = await tryAsync(
	// get a list of users from the database
	db.user.findMany()
);
```
This will make the ```users``` variable be of type ```T | Error```, meaning it can be either a value or an error (a union of types).

Then check for error in the variable with ```isError```, and then handle the error:
```typescript
if (isError(users)) {
	return "Could not get users from db";
}
```
This is a type guard and all code after the ```isError``` will consider result's type to be ```T```.

To see the library used in a project, checkout out [ahmeddots/oswald](https://github.com/ahmeddots/oswald).
