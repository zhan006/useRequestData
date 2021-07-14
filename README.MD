# useRequestData

A React hook for http request

## Usage

```
import {useRequestData} from useRequestData"
function App(){
    const [data, isLoading, forceReload] = useRequestData({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "post",
        params: { access_key: "apiKey“, query: "city" },
        body: { access_key: "apiKey", body: "city" },
        reloadDependencies: [],
    });
    return (
        <div>

        <button onClick={()=>forceReload()}>Reload</button>
        {isLoading && <h3>Loading</h3>}
        <div>{data && JSON.stringify(data)}</div>
        </div>
    )
}

```

## Params

```
useRequestData(config)
where config = {
    url:string --request url,
    headers:object --request headers (optional),
    method:string  -- request method (default 'GET'),
    params:object -- request parameter (optional)
    body:object -- request body (work for methods except GET)
    triggerCondition: bool -- condition of when to trigger a request (optional)
    reloadDependencies:array -- dependencies of triggering a request (optional),
    successCallback:func -- callback function with response body as parameter body on successful request (optional),
    errorCallback:func --callback function with response body as parameter on failed response,}
```
