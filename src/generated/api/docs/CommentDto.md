
# CommentDto


## Properties

Name | Type
------------ | -------------
`id` | number
`content` | string
`active` | boolean
`createdAt` | Date
`updatedAt` | Date
`author` | [UserSummaryDto](UserSummaryDto.md)
`postId` | number

## Example

```typescript
import type { CommentDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "content": null,
  "active": null,
  "createdAt": null,
  "updatedAt": null,
  "author": null,
  "postId": null,
} satisfies CommentDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CommentDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


