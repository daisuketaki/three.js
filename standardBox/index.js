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
  camera.position.set(0,0, +1000);

  //箱を作成
  const geometry = new THREE.BoxGeometry(500,500,500);
  const material = new THREE.MeshNormalMaterial();
  const box = new THREE.Mesh(geometry,material);
  scene.add(box);

  //平行光源
  const light = new THREE.DirectionalLight(0xFFFFFF);
  light.intensity = 2;
  light.position.set(1,1,1);
  //シーンに追加
  scene.add(light);

  //初回実行
  tick();

  function tick(){
  	requestAnimationFrame(tick);

  	//箱を回転させる
  	box.rotation.x += 0.01;
  	box.rotation.y += 0.01;

  	renderer.render(scene,camera);
  }
}