异步 Action
	
	发起请求的时刻、接受响应的时刻

	一般情况下，每个 API 请求都需要 dispatch 至少三种 action：

		一种通知 reducer 请求开始的 action。isFetching 的状态

		一种通知 reducer 请求成功的 action。success 的状态

		一种通知 reducer 请求失败的 action。error 的状态