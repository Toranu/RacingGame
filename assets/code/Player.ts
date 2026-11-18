import { _decorator, Component, Node ,Input ,input ,Collider} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    // 物体碰撞逻辑
    // 先获取目标节点的碰撞组件
    // 获取节点下的组件：节点.getComponent(组件类型)
    // 监听碰撞触发：组件.on('触发类型',执行函数，this)
    // 触发类型有：
    // onTriggerEnter 开始触发
    // onTriggerStay 持续触发
    // onTriggerExit 结束触发

    // 使得脚本可以链接其他节点并进行控制
    // 脚本中绑定节点/组件：@preperty（类型）对象名：类型 = null
    Move = true // 赛车开关
    @property(Node)
    c_Node: Node = null
    @property(Collider)  //导入赛车节点
    Player_Collider: Collider = null
    // 装饰器，可以使得该变量可以在编辑器编辑
    @property 
    Player_Speed: number = 5 // 设置角色速度

    Player_Move = {a:false , d:false} // 控制角色移动
    // Player_Collider : Collider = null  //赛车自身节点的碰撞组件
    // 自定义函数
    Key_Down(key){  // 默认参数是键盘按下相关信息
        if (key.keyCode == 65) {
            this.Player_Move.a = true
            // console.log('按下A键')
        }
        if (key.keyCode == 68) {
            this.Player_Move.d = true
            // console.log('按下D键')
        }
    }
    
    Key_Up(key){
        if (key.keyCode == 65) {
            this.Player_Move.a = false
            // console.log('抬起A键')
        }
        if (key.keyCode == 68) {
            this.Player_Move.d = false
            // console.log('抬起D键')
        }
    }
    Start_Collider(C){     // 碰撞执行函数 默认参数是碰撞相关信息
        if (C.otherCollider.node.name == 'Win') {
            console.log('成功')
        }else{
            console.log('失败')
        }
        console.log(C.otherCollider)  // otherCollider表示其他碰撞信息
        this.Move = false  // 关闭移动开关
    }


    // 加载函数
    protected onLoad() : void{
    
        input.on(Input.EventType.KEY_DOWN,this.Key_Down,this)
        input.on(Input.EventType.KEY_UP,this.Key_Up,this)
        // this.Player_Collider = this.Player_Node.getComponent(Collider)
        this.Player_Collider.on('onTriggerEnter',this.Start_Collider,this)
    }


    protected onDestroy():void{
        input.off(Input.EventType.KEY_DOWN,this.Key_Down,this)
        input.off(Input.EventType.KEY_UP,this.Key_Up,this)
        this.Player_Collider.off('onTriggerEnter',this.Start_Collider,this)
    }


    start() {

    }


    update(deltaTime: number) {  // daltaTime 就是每帧的时间
        // console.log(deltaTime) // 每帧时间
        if(!this.Move){
            return
        }
        // 先获取节点位置
        // 再修改节点位置
        const pos = this.node.getPosition()  // 获取赛车节点位置
        const C_Pos = this.c_Node.getPosition() // 获取相机节点位置
        // console.log(pos)
        // 由于个别设备帧率忽高忽低，造成速度不对等，为了防止这种情况，需要帧时间补偿
        
        // if(pos.z <=-288 ){
        //     this.Move = false
        //     return
        // }


        // 键盘按下的逻辑
        if(this.Player_Move.a && ! this.Player_Move.d){ // 向左移动
            pos.x = pos.x - deltaTime * this.Player_Speed
            // console.log(pos.x)
        }
        else if(this.Player_Move.d && !this.Player_Move.a){// 向右移动
            pos.x = pos.x + deltaTime * this.Player_Speed
            // console.log(pos.x)
        }
        // if(pos.x >= 2.5){
        //     pos.x = 2.5
        // }else if(pos.x <= -2.5){
        //     pos.x = -2.5
        // }
        pos.x = Math.max(Math.min(pos.x,2.5),-2.5)  //
        const z = pos.z - deltaTime * this.Player_Speed
        this.node.setPosition(pos.x, pos.y, z)
        this.c_Node.setPosition(C_Pos.x, C_Pos.y, C_Pos.z - deltaTime * this.Player_Speed)
    }
}

// 监听类型：

// 鼠标监听事件：
// Input.EventType.MOUSE_DOWN
// Input.EventType.MOUSE_MOBE
// Input.EventType.MOUSE_UP
// Input.EventType.MOUSE_WHEEL
// 触摸事件：
// Input.EventType.TOUCH_START
// Input.EventType.TOUCH_END
// Input.EventType.TOUCH_MOVE
// Input.EventType.TOUCH_CANCEL
// 键盘事件：
// Input.EventType.KEY_DOWN
// Input.EventType.KEY_END
// Input.EventType.KEY_PRESSING 持续按下
// Input.EventType.KEY_UP

// 监听写法： input.on(监听类型，触发后执行函数，this)
// 监听开启和关闭成对写（防止内存泄漏）