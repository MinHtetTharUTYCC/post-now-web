# PostControllerApi

All URIs are relative to *http://localhost:8090*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPost1**](PostControllerApi.md#createpost1operation) | **POST** /api/posts |  |
| [**deletePost**](PostControllerApi.md#deletepost) | **DELETE** /api/posts/{id} |  |
| [**deletePostImage**](PostControllerApi.md#deletepostimage) | **DELETE** /api/posts/{id}/image |  |
| [**getAllPosts**](PostControllerApi.md#getallposts) | **GET** /api/posts |  |
| [**getPostById**](PostControllerApi.md#getpostbyid) | **GET** /api/posts/{id} |  |
| [**getPostsByAuthor**](PostControllerApi.md#getpostsbyauthor) | **GET** /api/posts/user/{username} |  |
| [**searchPosts**](PostControllerApi.md#searchposts) | **GET** /api/posts/search |  |
| [**updatePost**](PostControllerApi.md#updatepost) | **PUT** /api/posts/{id} |  |
| [**updatePostImage**](PostControllerApi.md#updatepostimage) | **POST** /api/posts/{id}/image |  |



## createPost1

> CreatePost1200Response createPost1(title, content, postCreateDto)



### Example

```ts
import {
  Configuration,
  PostControllerApi,
} from '';
import type { CreatePost1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PostControllerApi();

  const body = {
    // string
    title: title_example,
    // string
    content: content_example,
    // PostCreateDto
    postCreateDto: ...,
  } satisfies CreatePost1OperationRequest;

  try {
    const data = await api.createPost1(body);
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
| **title** | `string` |  | [Defaults to `undefined`] |
| **content** | `string` |  | [Defaults to `undefined`] |
| **postCreateDto** | [PostCreateDto](PostCreateDto.md) |  | |

### Return type

[**CreatePost1200Response**](CreatePost1200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`, `multipart/form-data`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deletePost

> deletePost(id)



### Example

```ts
import {
  Configuration,
  PostControllerApi,
} from '';
import type { DeletePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PostControllerApi();

  const body = {
    // number
    id: 789,
  } satisfies DeletePostRequest;

  try {
    const data = await api.deletePost(body);
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
| **id** | `number` |  | [Defaults to `undefined`] |

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


## deletePostImage

> object deletePostImage(id)



### Example

```ts
import {
  Configuration,
  PostControllerApi,
} from '';
import type { DeletePostImageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PostControllerApi();

  const body = {
    // number
    id: 789,
  } satisfies DeletePostImageRequest;

  try {
    const data = await api.deletePostImage(body);
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
| **id** | `number` |  | [Defaults to `undefined`] |

### Return type

**object**

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


## getAllPosts

> PagePostDto getAllPosts(pageable)



### Example

```ts
import {
  Configuration,
  PostControllerApi,
} from '';
import type { GetAllPostsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PostControllerApi();

  const body = {
    // Pageable
    pageable: ...,
  } satisfies GetAllPostsRequest;

  try {
    const data = await api.getAllPosts(body);
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
| **pageable** | [](.md) |  | [Defaults to `undefined`] |

### Return type

[**PagePostDto**](PagePostDto.md)

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


## getPostById

> PostDto getPostById(id)



### Example

```ts
import {
  Configuration,
  PostControllerApi,
} from '';
import type { GetPostByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PostControllerApi();

  const body = {
    // number
    id: 789,
  } satisfies GetPostByIdRequest;

  try {
    const data = await api.getPostById(body);
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
| **id** | `number` |  | [Defaults to `undefined`] |

### Return type

[**PostDto**](PostDto.md)

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


## getPostsByAuthor

> PagePostDto getPostsByAuthor(username, pageable)



### Example

```ts
import {
  Configuration,
  PostControllerApi,
} from '';
import type { GetPostsByAuthorRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PostControllerApi();

  const body = {
    // string
    username: username_example,
    // Pageable
    pageable: ...,
  } satisfies GetPostsByAuthorRequest;

  try {
    const data = await api.getPostsByAuthor(body);
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

[**PagePostDto**](PagePostDto.md)

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


## searchPosts

> PagePostDto searchPosts(query, pageable)



### Example

```ts
import {
  Configuration,
  PostControllerApi,
} from '';
import type { SearchPostsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PostControllerApi();

  const body = {
    // string
    query: query_example,
    // Pageable
    pageable: ...,
  } satisfies SearchPostsRequest;

  try {
    const data = await api.searchPosts(body);
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
| **query** | `string` |  | [Defaults to `undefined`] |
| **pageable** | [](.md) |  | [Defaults to `undefined`] |

### Return type

[**PagePostDto**](PagePostDto.md)

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


## updatePost

> PostDto updatePost(id, postUpdateDto)



### Example

```ts
import {
  Configuration,
  PostControllerApi,
} from '';
import type { UpdatePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PostControllerApi();

  const body = {
    // number
    id: 789,
    // PostUpdateDto
    postUpdateDto: ...,
  } satisfies UpdatePostRequest;

  try {
    const data = await api.updatePost(body);
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
| **id** | `number` |  | [Defaults to `undefined`] |
| **postUpdateDto** | [PostUpdateDto](PostUpdateDto.md) |  | |

### Return type

[**PostDto**](PostDto.md)

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


## updatePostImage

> object updatePostImage(id, image)



### Example

```ts
import {
  Configuration,
  PostControllerApi,
} from '';
import type { UpdatePostImageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PostControllerApi();

  const body = {
    // number
    id: 789,
    // Blob
    image: BINARY_DATA_HERE,
  } satisfies UpdatePostImageRequest;

  try {
    const data = await api.updatePostImage(body);
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
| **id** | `number` |  | [Defaults to `undefined`] |
| **image** | `Blob` |  | [Defaults to `undefined`] |

### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

