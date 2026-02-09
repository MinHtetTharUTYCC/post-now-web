# FollowControllerApi

All URIs are relative to *http://localhost:8090*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**followUser**](FollowControllerApi.md#followuser) | **POST** /api/users/{username}/follow |  |
| [**getFollowStats**](FollowControllerApi.md#getfollowstats) | **GET** /api/users/{username}/follow-stats |  |
| [**getFollowers**](FollowControllerApi.md#getfollowers) | **GET** /api/users/{username}/followers |  |
| [**getFollowing**](FollowControllerApi.md#getfollowing) | **GET** /api/users/{username}/following |  |
| [**unfollowUser**](FollowControllerApi.md#unfollowuser) | **DELETE** /api/users/{username}/follow |  |



## followUser

> object followUser(username)



### Example

```ts
import {
  Configuration,
  FollowControllerApi,
} from '';
import type { FollowUserRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FollowControllerApi();

  const body = {
    // string
    username: username_example,
  } satisfies FollowUserRequest;

  try {
    const data = await api.followUser(body);
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


## getFollowStats

> { [key: string]: object; } getFollowStats(username)



### Example

```ts
import {
  Configuration,
  FollowControllerApi,
} from '';
import type { GetFollowStatsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FollowControllerApi();

  const body = {
    // string
    username: username_example,
  } satisfies GetFollowStatsRequest;

  try {
    const data = await api.getFollowStats(body);
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

### Return type

**{ [key: string]: object; }**

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


## getFollowers

> PageUserSummaryDto getFollowers(username, pageable)



### Example

```ts
import {
  Configuration,
  FollowControllerApi,
} from '';
import type { GetFollowersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FollowControllerApi();

  const body = {
    // string
    username: username_example,
    // Pageable
    pageable: ...,
  } satisfies GetFollowersRequest;

  try {
    const data = await api.getFollowers(body);
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

[**PageUserSummaryDto**](PageUserSummaryDto.md)

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


## getFollowing

> PageUserSummaryDto getFollowing(username, pageable)



### Example

```ts
import {
  Configuration,
  FollowControllerApi,
} from '';
import type { GetFollowingRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FollowControllerApi();

  const body = {
    // string
    username: username_example,
    // Pageable
    pageable: ...,
  } satisfies GetFollowingRequest;

  try {
    const data = await api.getFollowing(body);
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

[**PageUserSummaryDto**](PageUserSummaryDto.md)

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


## unfollowUser

> object unfollowUser(username)



### Example

```ts
import {
  Configuration,
  FollowControllerApi,
} from '';
import type { UnfollowUserRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FollowControllerApi();

  const body = {
    // string
    username: username_example,
  } satisfies UnfollowUserRequest;

  try {
    const data = await api.unfollowUser(body);
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

