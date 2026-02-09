
# PagePostDto


## Properties

Name | Type
------------ | -------------
`totalElements` | number
`totalPages` | number
`size` | number
`content` | [Array&lt;PostDto&gt;](PostDto.md)
`number` | number
`first` | boolean
`last` | boolean
`numberOfElements` | number
`sort` | [SortObject](SortObject.md)
`pageable` | [PageableObject](PageableObject.md)
`empty` | boolean

## Example

```typescript
import type { PagePostDto } from ''

// TODO: Update the object below with actual values
const example = {
  "totalElements": null,
  "totalPages": null,
  "size": null,
  "content": null,
  "number": null,
  "first": null,
  "last": null,
  "numberOfElements": null,
  "sort": null,
  "pageable": null,
  "empty": null,
} satisfies PagePostDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PagePostDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


