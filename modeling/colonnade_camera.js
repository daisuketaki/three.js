 // ページの読み込みを待つ
window.addEventListener('load', init);

function init() {
  // ここに処理を追加していきます

  var stats = initStats();

  const width = window.innerWidth;
  const height =window.innerHeight;
 
  //レンダラー作成
  const renderer = new THREE.WebGLRenderer({
  	canvas: document.querySelector('#WebGL-output')
  });
  renderer.setPixelRatio(window.devicePixelRaito);
  renderer.setSize(width,height);
  renderer.shadowMap.enabled = true;

  //シーン作成
  const scene = new THREE.Scene();

  //カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height,0.1,1000);
  camera.position.set(-30,40, 50);

  //カメラコントローラを作成
  var orbitControls = new THREE.OrbitControls(camera);
  orbitControls.autoRotate = false;
  var clock = new THREE.Clock();

  // 滑らかにカメラコントローラーを制御する
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.2;

  camera.lookAt(new THREE.Vector3(0,0,0));
 
  //平行光源
  const light = new THREE.DirectionalLight(0xFFFFFF);
  light.intensity = 2;
  light.position.set(1,1,1);
  //シーンに追加
 // scene.add(light);

  //環境光を作成
  const ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);


///objロード
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath("./models/map_083745f2-ae93-41ba-a7e7-b9431d94ba20_densified_obj/");
  mtlLoader.load('map_083745f2-ae93-41ba-a7e7-b9431d94ba20_densified_mesh_textured.obj.mtl', function(materials) {
      materials.preload();

      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath("./models/map_083745f2-ae93-41ba-a7e7-b9431d94ba20_densified_obj/");
      objLoader.load('map_083745f2-ae93-41ba-a7e7-b9431d94ba20_densified_mesh_textured.obj', function(object) {

        // configure the wings
      /*  var wing2 = object.children[5];
        var wing1 = object.children[4];

    //    wing1.material.opacity = 0.6;
        wing1.material.transparent = true;
        wing1.material.depthTest = false;
        wing1.material.side = THREE.DoubleSide;

        wing2.material.opacity = 0.6;
        wing2.material.depthTest = false;
        wing2.material.transparent = true;
        wing2.material.side = THREE.DoubleSide;
*/
        object.scale.set(14, 14, 14);
        mesh = object;
        scene.add(mesh);

           });
  });



  //初回実行
  tick();

  function tick(){
    stats.update();

    //カメラコントローラを更新
    var delta = clock.getDelta();
    orbitControls.update(delta);

    //原点を見つめる
//    camera.lookAt(new THREE.Vector3(0,0,0)); 


  	renderer.render(scene,camera);
    requestAnimationFrame(tick);
    
  }

  function initStats() {

      var stats = new Stats();
      stats.setMode(0); // 0: fps, 1: ms


      // Align top-left
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '0px';
      stats.domElement.style.top = '0px';

      document.getElementById("Stats-output").appendChild(stats.domElement);

      return stats;
  }

}