(function () {
    "use strict";
    var countdown;
    var app = new Vue({
        el: "#app",
        data: {
            todolist:[
                {id:"1",content:"The First task to do today!",complete:true},
                {id:"2",content:"The Second task to do today!",complete:false},
                {id:"3",content:"The Third task to do today!",complete:false},
            ],
            newItem:"",
            doingWork:{},
            timeLeft:0,
            startBtn:true,
            currentTime: 0, // working:time[0] ; break:time[1]
            time:[
                {
                    name:"working",
                    duration: 1500
                },
                {
                    name:"break",
                    duration: 300
                }
            ],
            isPaused:false
        },
        mounted: function () {
            var vm =this;
            vm.timeLeft = vm.time[vm.currentTime].duration*1000;
        },
        updated: function () {
        },
        methods: {
            addTodo:function(){
                let guid = this.createGuid();
                if(this.newItem != null){
                    this.todolist.push({
                        id:guid,
                        content:this.newItem,
                        complete:false
                    })
                    this.newItem = "";
                    $('#addTask').modal('hide');
                }
            },
            addDoing:function(item){
                this.doingWork = item;
                this.timer(this.currentTime);
                this.startBtn=false;
            },
            deleteItem:function(id){
                var check = confirm('確定要刪除此工作項目?');
                if (check) {
                    this.todolist.splice(this.todolist.indexOf(id), 1);
                }
            },
            startCountDown:function(type){
                this.doingWork = this.notYet[0];
                this.timer(this.currentTime);
                this.startBtn = false;
            },
            timer:function(current){
                const vm= this;
                countdown= window.setInterval(function () {
                    if(!vm.isPaused){
                        vm.time[current].duration--
                        vm.timeLeft = vm.time[current].duration*1000;
                    }
                    if(vm.time[current].duration <= 0){
                        vm.currentTime = vm.currentTime+1
                        if(vm.currentTime == 2){
                            clearInterval(countdown);
                            vm.reset();
                            return 
                        }else{
                            clearInterval(countdown);
                            vm.timeLeft= vm.time[vm.currentTime].duration*1000;
                            vm.timer(vm.currentTime);
                        }
                    }
                },1000)
            },
            pauseCounting:function(){
                this.isPaused = !this.isPaused;
            },
            reset: function(){
                clearInterval(countdown);
                this.time=[
                    {
                        name:"working",
                        duration: 1500
                    },
                    {
                        name:"break",
                        duration:300
                    }
                ];
                this.startBtn = true;
                this.isPaused=false;
                this.currentTime = 0;
                this.timeLeft = this.time[this.currentTime].duration*1000;
                
            }
        },
        filters: {
            nowTime:function(time){
                if (time === null) {
                    return "";
                }
                return moment(time).format('HH:mm');
            },
            
        },
        mixins: [self.mixinMethod,self.formatMixin],
        watch: {
        },
        computed: {
            displayStatus:function(){
                if(this.currentTime == 0){
                    return　"Work";
                }
                return "Break";

            },
            notYet:function(){
                var items = this.todolist.filter(function(e){
                    return e.complete == false;
                });
                return items;
            },
            workCompleted:function(){
                var completedItem = this.todolist.filter(function(e){
                    return e.complete == true;
                });
                return completedItem;
            }
        },
        components: {
        }
    });
    window.app= app;
})();