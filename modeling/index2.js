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
  renderer.shadowMap.enabled = true; //影を有効化
//  renderer.setClearColor(0xeeeeee, 1);    //背景色

  //シーン作成
  const scene = new THREE.Scene();

  //カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height,1,10000000);
  camera.position.z = 250;
//  camera.position.set(0,0, +1000);

  //カメラコントローラを作成
  const controls = new THREE.OrbitControls(camera,document.getElementById('myCanvas'));

  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  camera.lookAt(new THREE.Vector3(0,0,0));
 
// 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  directionalLight.castShadow = true; // 影を出す
  scene.add(directionalLight);
  // 環境光を追加
  const ambientLight = new THREE.AmbientLight(0x333333);
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

    // 3DS形式のモデルデータを読み込む
    const loader = new THREE.ColladaLoader();
    // 3dsファイルのパスを指定
    loader.load('./models/portEuropaColonnade/portEuropaColonnade.dae', (collada) => {
      // 読み込み後に3D空間に追加
      const model = collada.scene;
      model.castShadow = true;
      scene.add(model);
    });
  }

}