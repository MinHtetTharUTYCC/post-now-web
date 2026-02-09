# HealthControllerApi

All URIs are relative to *http://localhost:8090*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**authHealthCheck**](HealthControllerApi.md#authhealthcheck) | **GET** /api/health/auth |  |
| [**healthCheck**](HealthControllerApi.md#healthcheck) | **GET** /api/health |  |
| [**postsHealthCheck**](HealthControllerApi.md#postshealthcheck) | **GET** /api/health/posts |  |



## authHealthCheck

> object authHealthCheck()



### Example

```ts
import {
  Configuration,
  HealthControllerApi,
} from '';
import type { AuthHealthCheckRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new HealthControllerApi();

  try {
    const data = await api.authHealthCheck();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

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


## healthCheck

> object healthCheck()



### Example

```ts
import {
  Configuration,
  HealthControllerApi,
} from '';
import type { HealthCheckRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new HealthControllerApi();

  try {
    const data = await api.healthCheck();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

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


## postsHealthCheck

> object postsHealthCheck()



### Example

```ts
import {
  Configuration,
  HealthControllerApi,
} from '';
import type { PostsHealthCheckRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new HealthControllerApi();

  try {
    const data = await api.postsHealthCheck();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

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

