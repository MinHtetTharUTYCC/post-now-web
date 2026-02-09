
# CreatePost1200Response


## Properties

Name | Type
------------ | -------------
`id` | number
`title` | string
`content` | string
`type` | string
`imageUrl` | string
`active` | boolean
`createdAt` | Date
`updatedAt` | Date
`author` | [UserSummaryDto](UserSummaryDto.md)
`likesCount` | number
`commentsCount` | number
`likedByCurrentUser` | boolean

## Example

```typescript
import type { CreatePost1200Response } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "title": null,
  "content": null,
  "type": null,
  "imageUrl": null,
  "active": null,
  "createdAt": null,
  "updatedAt": null,
  "author": null,
  "likesCount": null,
  "commentsCount": null,
  "likedByCurrentUser": null,
} satisfies CreatePost1200Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreatePost1200Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


