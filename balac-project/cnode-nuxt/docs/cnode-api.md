https://cnodejs.org/api/v1

主题：
	
	get /topics 		主题首页

	get /topic/:id		主题详情

	post /topics		新建主题

	post /topics/update	编辑主题

主题收藏：
	
	post /topic_collect/collect 	收藏主题

	post /topic_collect/de_collect	取消主题

	get /topic_collect/:loginname 	用户搜藏的主题

评论：
	
	post /topic/:topic_id/replies 	新建评论

	post /reply/:reply_id/ups		为评论点赞

用户：
	
	get /user/:loginname 	用户详情

	post /accesstoken 		验证 accessToken 的正确性

消息通知：	
	
	get /message/count		获取未读消息数

	get /messages 			获取已读和未读消息

	post /message/mark_all  标记全部已读

	post /message/mark_one/:msg_id 标记单个消息为已读