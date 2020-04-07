 // ページの読み込みを待つ
window.addEventListener('load', init);

function init() {
  // ここに処理を追加していきます
  const width = 960;
  const height = 540;
  let rot = 0;
  let mouseX = 0;

  //レンダラー作成
  const renderer = new THREE.WebGLRenderer({
  	canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRaito);
  renderer.setSize(width,height);
//  renderer.setClearColor(0xeeeeee, 1);    //背景色

  //シーン作成
  const scene = new THREE.Scene();

  //カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height,1,10000000);
  camera.position.z = 0;
//  camera.position.set(0,0, +1000);

  //カメラコントローラを作成
  const controls = new THREE.OrbitControls(camera,document.getElementById('myCanvas'));

  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  camera.lookAt(new THREE.Vector3(0,0,0));
 
  //平行光源
  const light = new THREE.DirectionalLight(0xFFFFFF);
  light.intensity = 2;
  light.position.set(1,1,1);
  //シーンに追加
  scene.add(light);

  //環境光を作成
  const ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);

  //星屑作成
  createStarField();

  function createStarField(){
    //形状データを作成
    const geometry = new THREE.Geometry();
    for(let i=0; i<1000; i++){
      geometry.vertices.push(
          new THREE.Vector3(
              3000 * (Math.random() - 0.5),
              3000 * (Math.random() - 0.5),
              3000 * (Math.random() - 0.5),
            )
        );
    }
    //マテリアル作成
    const material = new THREE.PointsMaterial({
      size:5,
      color : 0xffffff
    });
    //物体を作成
    const mesh = new THREE.Points(geometry,material);
    scene.add(mesh);

  }


  //モデルのロード
  loadModels();

  //初回実行
  tick();
  console.log(scene.children);
  function tick(){
    //カメラコントローラを更新
    controls.update();

    //原点を見つめる
//    camera.lookAt(new THREE.Vector3(0,0,0)); 
  	renderer.render(scene,camera);
    requestAnimationFrame(tick);
  }

  //モデル読み込み
  function loadModels(){

    /* MTLファイルとObjファイルの読み込み */           
    new THREE.MTLLoader().setPath('models/map_083745f2-ae93-41ba-a7e7-b9431d94ba20_densified_obj/')
                         .load('map_083745f2-ae93-41ba-a7e7-b9431d94ba20_densified_mesh_textured.obj.mtl',function(materials){
        
        materials.preload();
        
        new THREE.OBJLoader().setPath('models/map_083745f2-ae93-41ba-a7e7-b9431d94ba20_densified_obj/')
                             .setMaterials(materials)
                             .load('map_083745f2-ae93-41ba-a7e7-b9431d94ba20_densified_mesh_textured.obj',function (object){
            
            object.position.set(0,0,0);
            object.scale.set(1,1,1);
            object.traverse( function( node ) {
              if( node.material ) {
                  node.material.side = THREE.DoubleSide;
              }
            object.name = "colonnade";
          });
            scene.add(object);
            
        }); 
    });
  }

}