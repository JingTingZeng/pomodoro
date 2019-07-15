(function () {
    "use strict";
    var countdown;
    var app = new Vue({
        el: "#app",
        data: {
            todolist:[],
            newItem:"",
            doingWork:{},
            timeLeft:0,
            startBtn:true,
            currentTime: 0, // working:time[0] ; break:time[1]
            time:[
                {
                    name:"working",
                    duration: 60
                },
                {
                    name:"break",
                    duration:300
                }
            ],
            isPaused:false
        },
        mounted: function () {
            var vm =this;
            if(this.todolist.length != 0){
                this.addDoing(this.todolist[0]);
            }
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
            },
            deleteItem:function(id){
                var check = confirm('確定要刪除此工作項目?');
                if (check) {
                    this.todolist.splice(this.todolist.indexOf(id), 1);
                }
            },
            startCountDown:function(type){
                this.timer(this.currentTime);
                this.startBtn = false;
            },
            timer:function(current){
                // const now = Date.now();
                // const then = now + this.time[current].duration;
                // const vm = this;

                // this.timeLeft = seconds*1000;

                // countdown= window.setInterval(function () {
                //     let secondsLeft = Math.round((then -  Date.now())/1000);
                //     if (secondsLeft < 0) {
                //         window.clearInterval(countdown);
                //         return;
                //     }
                //     vm.timeLeft = secondsLeft*1000;
                // }, 1000)
                const vm= this;
                countdown= window.setInterval(function () {
                    if(!vm.isPaused){
                        vm.time[current].duration--
                        vm.timeLeft = vm.time[current].duration*1000;
                    }
                    if(vm.time[current].duration <= 0){
                        vm.currentTime = vm.currentTime+1
                        if(vm.currentTime === 2){
                            console.log("break time over,restart pomodoro");
                            clearInterval(countdown);
                            vm.currentTime = 0;
                            return 
                        }else{
                            clearInterval(countdown);
                            console.log("work time over,start break");
                            vm.currentTime = 1;
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
            
        },
        mixins: [self.mixinMethod,self.formatMixin],
        watch: {
            // isPaused:function(val){
            //     if(val){
            //         this.startBtn = true;
            //     }else{
            //         this.startBtn = false;
            //     }
            // }
        },
        computed: {
        },
        components: {
            
        }
    });
})();