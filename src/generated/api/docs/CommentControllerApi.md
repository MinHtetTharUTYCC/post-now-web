# CommentControllerApi

All URIs are relative to *http://localhost:8090*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createComment**](CommentControllerApi.md#createcomment) | **POST** /api/comments/post/{postId} |  |
| [**deleteComment**](CommentControllerApi.md#deletecomment) | **DELETE** /api/comments/{commentId} |  |
| [**getCommentsByPostId**](CommentControllerApi.md#getcommentsbypostid) | **GET** /api/comments/post/{postId} |  |
| [**getCommentsByUsername**](CommentControllerApi.md#getcommentsbyusername) | **GET** /api/comments/user/{username} |  |



## createComment

> CommentDto createComment(postId, commentCreateDto)



### Example

```ts
import {
  Configuration,
  CommentControllerApi,
} from '';
import type { CreateCommentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CommentControllerApi();

  const body = {
    // number
    postId: 789,
    // CommentCreateDto
    commentCreateDto: ...,
  } satisfies CreateCommentRequest;

  try {
    const data = await api.createComment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **postId** | `number` |  | [Defaults to `undefined`] |
| **commentCreateDto** | [CommentCreateDto](CommentCreateDto.md) |  | |

### Return type

[**CommentDto**](CommentDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteComment

> deleteComment(commentId)



### Example

```ts
import {
  Configuration,
  CommentControllerApi,
} from '';
import type { DeleteCommentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CommentControllerApi();

  const body = {
    // number
    commentId: 789,
  } satisfies DeleteCommentRequest;

  try {
    const data = await api.deleteComment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **commentId** | `number` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCommentsByPostId

> PageCommentDto getCommentsByPostId(postId, pageable)



### Example

```ts
import {
  Configuration,
  CommentControllerApi,
} from '';
import type { GetCommentsByPostIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CommentControllerApi();

  const body = {
    // number
    postId: 789,
    // Pageable
    pageable: ...,
  } satisfies GetCommentsByPostIdRequest;

  try {
    const data = await api.getCommentsByPostId(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **postId** | `number` |  | [Defaults to `undefined`] |
| **pageable** | [](.md) |  | [Defaults to `undefined`] |

### Return type

[**PageCommentDto**](PageCommentDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCommentsByUsername

> PageCommentDto getCommentsByUsername(username, pageable)



### Example

```ts
import {
  Configuration,
  CommentControllerApi,
} from '';
import type { GetCommentsByUsernameRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CommentControllerApi();

  const body = {
    // string
    username: username_example,
    // Pageable
    pageable: ...,
  } satisfies GetCommentsByUsernameRequest;

  try {
    const data = await api.getCommentsByUsername(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **username** | `string` |  | [Defaults to `undefined`] |
| **pageable** | [](.md) |  | [Defaults to `undefined`] |

### Return type

[**PageCommentDto**](PageCommentDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

