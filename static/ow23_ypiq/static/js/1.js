const beedon_form_code_set = `
<!-- 引入 Vant 的 CSS 文件 -->
<link rel="stylesheet" href="https://m.luobu.cn/static/js/vant2.1/index.css"/>
<link rel="stylesheet"href="https://m.luobu.cn/static/js/datepicker/rui-datepicker.min.css"/>

<div id="beedon-202110166-app">
	<beedon-van-tabs></beedon-van-tabs>
</div>

<template id="beedon-van-tabs">
	<van-tabs v-model="active">
		<van-tab title="八字精批">
			<beedon-form1 :project_id="196339" button_name="立即测算"></beedon-form1>
		</van-tab>	
		<van-tab title="八字合婚">
			<beedon-form2 :project_id="564764" button_name="立即合婚"></beedon-form2>
		</van-tab>
	</van-tabs>
</template>
<template id="beedon-20211016-form">
	<van-form validate-first @submit="submitForm">
		<van-field
			v-if="show.name"
			:border="true"
			v-model="form.name"
			label="您的姓名"
			placeholder="请输入名字（汉字）"
			:rules="[{ required: true }]">
		</van-field>
		<van-field
			v-if="show.sex"
			name="sex"
			label="您的性别"
			:rules="[{ required: true ,message: '请选择您的性别'}]">
		  <template #input>
			<van-radio-group v-model="form.sex" direction="horizontal">
			  <van-radio :name="1">男</van-radio>
			  <van-radio :name="2">女</van-radio>
			</van-radio-group>
		  </template>
		</van-field>
		
		<beedon-form-birthday
			v-if="show.birthday"
			:birthday.sync="form.birthday"
			:datetime.sync="form.datetime"
			tag="1"
			label="出生日期">
		</beedon-form-birthday>
		
		<van-field
			v-if="show.affective_state"
			name="affective_state"
			label="情感状态"
			:rules="[{ required: true ,message: '请选择您的情感状态'}]">
		  <template #input>
			<van-radio-group v-model="form.affective_state" direction="horizontal">
			  <van-radio :name="1">单身</van-radio>
			  <van-radio :name="2">有伴</van-radio>
			</van-radio-group>
		  </template>
		</van-field>
		<van-field
			v-if="show.male_name"
			:border="true"
			v-model="form.male_name"
			label="男方姓名"
			placeholder="请输入名字（汉字）"
			:rules="[{ required: true }]">
		</van-field>
		<beedon-form-birthday
			v-if="show.male_birthday"
			:birthday.sync="form.male_birthday"
			:datetime.sync="form.male_datetime"
			tag="2"
			label="出生日期">
		</beedon-form-birthday>
		
		<van-field
			v-if="show.female_name"
			:border="true"
			v-model="form.female_name"
			label="女方姓名"
			placeholder="请输入名字（汉字）"
			:rules="[{ required: true }]">
		</van-field>
		<beedon-form-birthday
			v-if="show.female_birthday"
			:birthday.sync="form.female_birthday"
			:datetime.sync="form.female_datetime"
			tag="3"
			label="出生日期">
		</beedon-form-birthday>
		
		
		<div style="margin: 16px;">
			<van-button
				round
				block
				color="#e55055"
				type="info"
				native-type="submit">{{button_name}}</van-button>
		</div>
	</van-form>
</template>

<template id="beedon-form-birthday">
	<van-field
		:label="label"
		right-icon="notes-o"
		v-model="birthday_time"
		:class="'beedon_birthday_time_'+tag"
		:data-toid-date="'beedon_birthday_date'+tag"
		:data-toid-hour="'beedon_birthday_hour'+tag"
		data-hour="1"
		readonly="readonly"
		placeholder="请选择出生日期（必填）"
		:rules="[{ required: true }]">
		<template #extra>
			<input type="hidden" :ref="'beedon_birthday_date'+tag" :id="'beedon_birthday_date'+tag" value="" name="name">
			<input type="hidden" :ref="'beedon_birthday_hour'+tag" :id="'beedon_birthday_hour'+tag" value="" name="hour">
			<input type="hidden" :ref="'beedon_birthday_minute'+tag" :id="'beedon_birthday_hour'+tag" value="" name="minute">
		</template>
		
	</van-field>
</template>

<!-- 引入 Vue 和 Vant 的 JS 文件 -->
<script src="https://m.luobu.cn/static/js/vue2.6/vue.min.js"></script>

<script src="https://m.luobu.cn/static/js/vant2.1/vant.min.js"></script>
<script src="https://m.luobu.cn/static/js/axios/axios.min.js"></script>
<script src="https://m.luobu.cn/static/js/datepicker/rui-datepicker.min.js"></script>
<script src="https://m.luobu.cn/static/js/beedon_all_vue.min.js?1.1.2"></script>
`;
document.write(beedon_form_code_set);