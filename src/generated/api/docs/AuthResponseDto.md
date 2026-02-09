
# AuthResponseDto


## Properties

Name | Type
------------ | -------------
`token` | string
`username` | string
`email` | string
`role` | string
`message` | string

## Example

```typescript
import type { AuthResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "token": null,
  "username": null,
  "email": null,
  "role": null,
  "message": null,
} satisfies AuthResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AuthResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


