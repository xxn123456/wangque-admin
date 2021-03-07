<template>
  <div class="barrages-drop">
    <vue-baberrage
      :isShow="barrageIsShow"
      :barrageList="barrageList"
      :maxWordCount="maxWordCount"
      :throttleGap="throttleGap"
      :loop="barrageLoop"
      :boxHeight="boxHeight"
      :messageHeight="messageHeight"
    >
    </vue-baberrage>
  </div>
</template>
<script>
import Vue from 'vue';
import { vueBaberrage, MESSAGE_TYPE } from 'vue-baberrage';

Vue.use(vueBaberrage);

export default {
	name: 'Barrages',
	data() {
		return {
			msg: '薯条',
			barrageIsShow: true,
			messageHeight: 3,
			boxHeight: 150,
			barrageLoop: true,
			maxWordCount: 3,
			throttleGap: 5000,
			barrageList: []
		};
	},
	mounted() {
		this.addToList();
	},
	methods: {
		addToList() {
			let list = [
				{
					id: 1,
				
					msg: this.msg,
					time: 3,
					barrageStyle: 'red'
				},
				{
					id: 2,
					
					msg: this.msg,
					time: 8,
					barrageStyle: 'green'
				},
				{
					id: 3,
					
					msg: this.msg,
					time: 10,
					barrageStyle: 'normal'
				},
				
				
			];
			list.forEach((v) => {
				this.barrageList.push({
					id: v.id,
					msg: v.msg,
					time: v.time,
					type: MESSAGE_TYPE.NORMAL,
					barrageStyle: v.barrageStyle
				});
			});
		}
	}
};
</script>
<style  lang="scss" scoped>
.barrages-drop {
	.blue {
		border-radius: 100px;
		background: #e6ff75;
		color: #fff;
	}

	.green {
		border-radius: 100px;
		background: #75ffcd;
		color: #fff;
	}
	.red {
		border-radius: 100px;
		background: #e68fba;
		color: #fff;
	}
	.yellow {
		border-radius: 100px;
		background: #dfc795;
		color: #fff;
	}
	.baberrage-stage {
		position: absolute;
		width: 100%;
		height: 212px;
		overflow: hidden;
		top: 0;
		margin-top: 130px;
	}
}
</style>
————————————————
版权声明：本文为CSDN博主「马优晨」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_24147051/article/details/102696075