# LikeControllerApi

All URIs are relative to *http://localhost:8090*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getLikesCount**](LikeControllerApi.md#getlikescount) | **GET** /api/likes/post/{postId}/count |  |
| [**isPostLikedByUser**](LikeControllerApi.md#ispostlikedbyuser) | **GET** /api/likes/post/{postId}/status |  |
| [**likePost**](LikeControllerApi.md#likepost) | **POST** /api/likes/post/{postId} |  |
| [**toggleLike**](LikeControllerApi.md#togglelike) | **POST** /api/likes/post/{postId}/toggle |  |
| [**unlikePost**](LikeControllerApi.md#unlikepost) | **DELETE** /api/likes/post/{postId} |  |



## getLikesCount

> { [key: string]: number; } getLikesCount(postId)



### Example

```ts
import {
  Configuration,
  LikeControllerApi,
} from '';
import type { GetLikesCountRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LikeControllerApi();

  const body = {
    // number
    postId: 789,
  } satisfies GetLikesCountRequest;

  try {
    const data = await api.getLikesCount(body);
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

### Return type

**{ [key: string]: number; }**

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


## isPostLikedByUser

> { [key: string]: boolean; } isPostLikedByUser(postId)



### Example

```ts
import {
  Configuration,
  LikeControllerApi,
} from '';
import type { IsPostLikedByUserRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LikeControllerApi();

  const body = {
    // number
    postId: 789,
  } satisfies IsPostLikedByUserRequest;

  try {
    const data = await api.isPostLikedByUser(body);
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

### Return type

**{ [key: string]: boolean; }**

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


## likePost

> { [key: string]: string; } likePost(postId)



### Example

```ts
import {
  Configuration,
  LikeControllerApi,
} from '';
import type { LikePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LikeControllerApi();

  const body = {
    // number
    postId: 789,
  } satisfies LikePostRequest;

  try {
    const data = await api.likePost(body);
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

### Return type

**{ [key: string]: string; }**

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


## toggleLike

> { [key: string]: string; } toggleLike(postId)



### Example

```ts
import {
  Configuration,
  LikeControllerApi,
} from '';
import type { ToggleLikeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LikeControllerApi();

  const body = {
    // number
    postId: 789,
  } satisfies ToggleLikeRequest;

  try {
    const data = await api.toggleLike(body);
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

### Return type

**{ [key: string]: string; }**

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


## unlikePost

> { [key: string]: string; } unlikePost(postId)



### Example

```ts
import {
  Configuration,
  LikeControllerApi,
} from '';
import type { UnlikePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LikeControllerApi();

  const body = {
    // number
    postId: 789,
  } satisfies UnlikePostRequest;

  try {
    const data = await api.unlikePost(body);
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

### Return type

**{ [key: string]: string; }**

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

