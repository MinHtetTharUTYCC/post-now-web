
# UserCreateDto


## Properties

Name | Type
------------ | -------------
`username` | string
`email` | string
`password` | string
`firstName` | string
`lastName` | string
`bio` | string
`profileImage` | string

## Example

```typescript
import type { UserCreateDto } from ''

// TODO: Update the object below with actual values
const example = {
  "username": null,
  "email": null,
  "password": null,
  "firstName": null,
  "lastName": null,
  "bio": null,
  "profileImage": null,
} satisfies UserCreateDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserCreateDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


