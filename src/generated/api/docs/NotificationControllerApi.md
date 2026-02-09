# NotificationControllerApi

All URIs are relative to *http://localhost:8090*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAllNotifications**](NotificationControllerApi.md#getallnotifications) | **GET** /api/notifications |  |
| [**getUnreadCount**](NotificationControllerApi.md#getunreadcount) | **GET** /api/notifications/unread-count |  |
| [**getUnreadNotifications**](NotificationControllerApi.md#getunreadnotifications) | **GET** /api/notifications/unread |  |
| [**markAllAsRead**](NotificationControllerApi.md#markallasread) | **PUT** /api/notifications/read-all |  |
| [**markAsRead**](NotificationControllerApi.md#markasread) | **PUT** /api/notifications/{id}/read |  |



## getAllNotifications

> PageNotificationDto getAllNotifications(pageable)



### Example

```ts
import {
  Configuration,
  NotificationControllerApi,
} from '';
import type { GetAllNotificationsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NotificationControllerApi();

  const body = {
    // Pageable
    pageable: ...,
  } satisfies GetAllNotificationsRequest;

  try {
    const data = await api.getAllNotifications(body);
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

[**PageNotificationDto**](PageNotificationDto.md)

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


## getUnreadCount

> { [key: string]: number; } getUnreadCount()



### Example

```ts
import {
  Configuration,
  NotificationControllerApi,
} from '';
import type { GetUnreadCountRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NotificationControllerApi();

  try {
    const data = await api.getUnreadCount();
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


## getUnreadNotifications

> PageNotificationDto getUnreadNotifications(pageable)



### Example

```ts
import {
  Configuration,
  NotificationControllerApi,
} from '';
import type { GetUnreadNotificationsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NotificationControllerApi();

  const body = {
    // Pageable
    pageable: ...,
  } satisfies GetUnreadNotificationsRequest;

  try {
    const data = await api.getUnreadNotifications(body);
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

[**PageNotificationDto**](PageNotificationDto.md)

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


## markAllAsRead

> object markAllAsRead()



### Example

```ts
import {
  Configuration,
  NotificationControllerApi,
} from '';
import type { MarkAllAsReadRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NotificationControllerApi();

  try {
    const data = await api.markAllAsRead();
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


## markAsRead

> object markAsRead(id)



### Example

```ts
import {
  Configuration,
  NotificationControllerApi,
} from '';
import type { MarkAsReadRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NotificationControllerApi();

  const body = {
    // number
    id: 789,
  } satisfies MarkAsReadRequest;

  try {
    const data = await api.markAsRead(body);
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

