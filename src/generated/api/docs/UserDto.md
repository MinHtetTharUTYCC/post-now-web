
# UserDto


## Properties

Name | Type
------------ | -------------
`id` | number
`username` | string
`email` | string
`firstName` | string
`lastName` | string
`bio` | string
`profileImage` | string
`role` | string
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { UserDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "username": null,
  "email": null,
  "firstName": null,
  "lastName": null,
  "bio": null,
  "profileImage": null,
  "role": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies UserDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


