
# NotificationDto


## Properties

Name | Type
------------ | -------------
`id` | number
`type` | string
`actor` | [UserSummaryDto](UserSummaryDto.md)
`postId` | number
`commentId` | number
`read` | boolean
`createdAt` | Date
`message` | string

## Example

```typescript
import type { NotificationDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "actor": null,
  "postId": null,
  "commentId": null,
  "read": null,
  "createdAt": null,
  "message": null,
} satisfies NotificationDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NotificationDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


