<template>
  <div id="main">
        <h1>Vue Draggable</h1>

        <div :class="dragging? 'list-dragging' : 'drag'">
            <h2>Draggable</h2>
            <draggable  :list="list" @start="dragging=true" @end="dragging=false">
                <div v-for="element in list">{{element.name}}</div>
             </draggable>
         </div>

         <div class="normal">
            <h2>Normal v-for</h2>
            <div >
                <div v-for="element in list">{{element.name}}</div>
             </div>
         </div>

        <button @click="add">Add</button>
        <button @click="replace">Replace</button>

        <br>

        <a href="Two_Lists.html">See 2 lists example</a>
        <a href="Two_Lists_Clone.html">See clone element example</a>
        <a href="Two_Lists_Clone_If.html">See clone v-if element example</a>

    </div>
</template>

<script>

let id = 2
import sortable from 'sortablejs'
import buildDraggable from './vuedraggable.js'

export default {
  components: {
    draggable: buildDraggable(sortable)
  },
  data () {
		return {
      list: [ 
        {name: "John", id:0}, 
				{name: "Joao", id:1}, 
				{name: "Jean", id:2} 
      ],
		  dragging: false
    }
	},
	methods:{
			add: function(){
				this.list.push({name:'Juan '+id, id: id++});
			},
			replace: function(){
				this.list=[{name:'Edgard', id: id++}]
			}
		}
}
</script>

<style>
.normal {
    background-color: grey;
}
.drag {
    background-color: green;
}
.dragArea {
     min-height: 10px;	
}

.list-dragging {
	background-color: blue;
}

.target.ok {
  background-color: blue;
}

.target.ko {
  background-color: red;
}

.status {
  height: 10px;
}

.status .ok {
  background-color: green;
}

.status .ko {
  background-color: red;
}

.list-complete-item {
  padding: 4px;
  margin-top: 4px;
  border: solid 1px;
  height: 60px;
}

.list-complete-enter-active {
  overflow: hidden;
  transition: all 1s;
}

.list-complete-leave-active {
  margin-top: 0px;
  overflow: hidden;
  transition: all 1s;
}

.list-complete-enter, .list-complete-leave-to {
  height: 0px;
  opacity: 0;
  padding: 0px;
  margin-top: 0px;
  overflow: hidden;
}

.machine-contents {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5%;
  margin-right: 5%;
  /*width: 45%;*/
}

#areas {
  display: flex;
}

#columns {
  flex: 1;
}

#columns>.list {
  width: 40%;
  float: left;
}

.item {
  padding: 5px;
  background: #CCCCCC;
  border: 1px solid black;
}

</style>