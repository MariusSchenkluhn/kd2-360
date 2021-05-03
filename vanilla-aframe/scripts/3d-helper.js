// Check visibility
// From: https://gist.github.com/Strae/7def0f84677e03727f771636709b448f
function checkIfVisible(entity) {

    let entityMesh = entity.object3DMap.mesh;
    let frustum = new THREE.Frustum();
    let cameraViewProjectionMatrix = new THREE.Matrix4();

    // Get camera
    let camera = document.querySelector("[camera]").getObject3D('camera');

    // Update camera attributes
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();

    // Set limited FoV
    camera = camera.clone();
    camera.aspect = .5; // Reduced from 1
    camera.fov = 60; // Reduced from 80
    // camera.zoom = 4; // Alt variant to reduce fov

    camera.updateProjectionMatrix();

    // camera.matrixWorldInverse.getInverse(camera.matrixWorld);
    cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

    return frustum.intersectsObject(entityMesh);
}

/***
 * Get Vector3 in front of an object.
 *
 * @param object Reference object (THREE.object3D)
 * @param target Object in front of the user
 * @param distance How far should the object be in front of the object?
 * @param verticalHeight Vertical height
 * @return Position as Vector3
 */
function positionInFrontOf(object, target, distance, verticalHeight) {
    const posObj = new THREE.Vector3();
    const posHelper = new THREE.Vector3();

    posObj.setFromMatrixPosition(object.matrixWorld);
    posHelper.setFromMatrixPosition(target.matrixWorld);

    posHelper.sub(posObj);
    posHelper.y = 0;
    posHelper.normalize();
    posHelper.multiplyScalar(distance);
    posHelper.y = verticalHeight;

    return posObj.add(posHelper);
}
