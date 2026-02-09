
# PostUpdateDto


## Properties

Name | Type
------------ | -------------
`title` | string
`content` | string
`type` | string
`imageUrl` | string
`active` | boolean

## Example

```typescript
import type { PostUpdateDto } from ''

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "content": null,
  "type": null,
  "imageUrl": null,
  "active": null,
} satisfies PostUpdateDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PostUpdateDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


