import axios from "axios";
import { useState, useEffect } from "react";
export default function useRequestData(props) {
  const {
    url,
    headers = {},
    method = "GET",
    params,
    body,
    triggerCondition = true,
    reloadDependencies = [],
    successCallback = () => {},
    errorCallback = () => {},
  } = props;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const forceReload = () => setReload(!reload);
  useEffect(() => {
    if (triggerCondition) {
      setIsLoading(true);
      axios
        .request({
          url,
          method,
          headers,
          params,
          data: method.toLowerCase() === "get" ? null : body,
        })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response);
            setData(response.data);
            successCallback(response.data);
          } else {
            errorCallback(response);
          }
          setIsLoading(false);
        })
        .catch((reason) => {
          console.error(reason);
          setIsLoading(false);
        });
    }
  }, [triggerCondition, reload, ...reloadDependencies]);
  return [data, isLoading, forceReload];
}
export const useLazyRequestData = (props) => {
  const { url, headers = {}, method = "GET", params, body } = props;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [startRequest, setStartRequest] = useState(false);
  useEffect(() => {
    if (startRequest) {
      setIsLoading(true);
      axios
        .request({
          url,
          method,
          headers,
          params,
          data: method.toLowerCase() === "get" ? null : body,
        })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            setError(null);
            setData(response.data);
          } else {
            setError(response.data);
            setData(null);
          }
          setIsLoading(false);
          setStartRequest(false);
        })
        .catch((reason) => {
          setError(reason);
          setIsLoading(false);
          setStartRequest(false);
        });
    }
  }, [startRequest]);
  const request = () => {
    setStartRequest(true);
  };
  return [request, { data, isLoading, error }];
};
