window.addEventListener("DOMContentLoaded", init);

function init() {
  // ここに処理を追加していきます
  const width = 960;
  const height = 540;

  //レンダラー作成
  const renderer = new THREE.WebGLRenderer({
  	canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRaito);
  renderer.setSize(width,height);

  //シーン作成
  const scene = new THREE.Scene();

  //カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0,500, +1000);

  camera.lookAt(new THREE.Vector3(0,0,0));

  //コンテナ作成
  const container = new THREE.Object3D();
  scene.add(container);

  //マテリアル作成 テクスチャ付き
  const loader = new THREE.TextureLoader();
  const texture = loader.load('earthmap1k.jpg');
  const material = new THREE.MeshStandardMaterial({
    map:texture,
    side:THREE.DoubleSide
  });
 

  //球体作成
  const geometry = new THREE.SphereGeometry(300,30,30);
  //画像読み込み
   const mesh = new THREE.Mesh(geometry,material);
  scene.add(mesh);

  //平行光源
  const light = new THREE.DirectionalLight(0xFFFFFF);
  light.intensity = 2;
  light.position.set(1,1,1);
  //シーンに追加
  scene.add(light);

  //環境光を作成
  const ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);

  //ジオメトリ作成
  const geometryList = [
          new THREE.SphereGeometry(50), // 球体
          new THREE.BoxGeometry(100, 100, 100), // 直方体
          new THREE.PlaneGeometry(100, 100), // 平面
          new THREE.TetrahedronGeometry(100, 0), // カプセル形状
          new THREE.ConeGeometry(100, 100, 32), // 三角錐
          new THREE.CylinderGeometry(50, 50, 100, 32), // 円柱
          new THREE.TorusGeometry(50, 30, 16, 100) // ドーナツ形状
  ]

  geometryList.map((geometry,index) => {
    //形状とマテリアルからメッシュを作成
    const mesh = new THREE.Mesh(geometry,material);
    //３D表示インスタンスのSceneプロパティーが３D空間表示となる
    container.add(mesh);
    //円周上にはいち
    mesh.position.x = 
      400 * Math.sin((index / geometryList.length) * Math.PI *2);
    mesh.position.z = 
      400 * Math.cos((index / geometryList.length) * Math.PI *2);    
  });

  //初回実行
  tick();

  function tick(){
  	requestAnimationFrame(tick);

  	//箱を回転させる
  	container.rotation.y += 0.01;

  	renderer.render(scene,camera);
  }
}