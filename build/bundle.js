/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// import instanceOperator from \"./instanceOperator.js\";\n// import transformOperator from \"./transformOperator.js\";\n// import printingPlane from \"./printingPlane.js\";\n// import syncHelper from \"./syncHelper.js\";\n\n\nlet directoryPath = \".\";\n// Application logic will begin once DOM content is loaded\nwindow.onload = () => {\n    const app = new main();\n};\nclass main {\n    constructor() {\n        // Instantiate two viewers for two different views\n        const mainViewer = new Communicator.WebViewer({\n            containerId: \"viewer\",\n            empty: true\n        });\n        const overheadViewer = new Communicator.WebViewer({\n            containerId: \"subviewer\",\n            empty: true\n        });\n        this._viewerList = [mainViewer, overheadViewer];\n        this._modelList = [];\n        this._printSurfaces = [];\n        this._viewSync = new syncHelper(this._viewerList);\n        // By storing in the array, we can initialize both viewers with \n        // the same code using the array \"map\" function\n        this._viewerList.map(viewer => {\n            viewer.start();\n            viewer.setCallbacks({\n                modelStructureReady: () => {\n                    // Need to make a surface for each viewer\n                    this._printSurfaces.push(new printingPlane(viewer, 300, 10));\n                    // Load the model and pass in the matrix\n                    this.loadModel(\"microengine\", viewer);\n                    // Set the cameras for the two viewers\n                    let camPos, target, upVec;\n                    switch (viewer) {\n                        case mainViewer:\n                            camPos = new Communicator.Point3(-1000, -1000, 1000);\n                            target = new Communicator.Point3(0, 0, 0);\n                            upVec = new Communicator.Point3(0, 0, 1);\n                            break;\n                        case overheadViewer:\n                            camPos = new Communicator.Point3(0, 0, 1000);\n                            target = new Communicator.Point3(0, 0, 0);\n                            upVec = new Communicator.Point3(0, 1, 0);\n                            break;\n                        default:\n                            alert('Error: No WebViewer Objects Detected. Report to TS3D.');\n                    }\n                    const defaultCam = Communicator.Camera.create(camPos, target, upVec, 1, 720, 720, 0.01);\n                    viewer.view.setCamera(defaultCam);\n                    // Background color for viewers\n                    viewer.view.setBackgroundColor(new Communicator.Color(0, 153, 220), new Communicator.Color(218, 220, 222));\n                }\n            }); // End Callbacks on Both Viewers\n        }); // End Map\n        // Set additional callbacks for main viewer only\n        mainViewer.setCallbacks({\n            modelStructureReady: () => {\n                // Additional options for modelStructureReady that we did not want in both viewers\n                mainViewer.view.getAxisTriad().enable();\n                mainViewer.view.getNavCube().enable();\n                mainViewer.view.getNavCube().setAnchor(Communicator.OverlayAnchor.LowerRightCorner);\n            },\n            // Adding functionality for a selection callback in the main viewer\n            selectionArray: selectionEvents => {\n                // Do Not Want the Build Plate as a Part of any Model Selection Events\n                const ppNodeId = this._printSurfaces[0].getNodeId(); // Node Id of the build plate\n                // Return the selection IDs for the current selections, check if the printing plane\n                // was selected in the results - if so, remove it\n                const selectionIds = selectionEvents.map(sEvent => sEvent.getSelection().getNodeId());\n                const foundIndex = selectionIds.indexOf(ppNodeId);\n                if (foundIndex != -1) {\n                    mainViewer.selectionManager.remove(selectionEvents[foundIndex].getSelection());\n                    selectionEvents.splice(foundIndex, 1);\n                }\n                // If the printing plane was the only result, no other selections fired\n                // this callback, so exit\n                if (selectionEvents.length == 0) return;\n                // Otherwise, display node information for the first node in the selection array\n                const nodeId = selectionEvents[0].getSelection().getNodeId();\n                const modelFileName = mainViewer.model.getModelFileNameFromNode(nodeId);\n                const modelFileFormat = mainViewer.model.getModelFileTypeFromNode(nodeId);\n                document.getElementById(\"model-file-name\").innerHTML = modelFileName || \"N/A\";\n                document.getElementById(\"model-file-type\").innerHTML = Communicator.FileType[modelFileFormat] || \"N/A\";\n                document.getElementById(\"node-id\").innerHTML = nodeId.toString() || \"Unknown\";\n                document.getElementById(\"node-name\").innerHTML = mainViewer.model.getNodeName(nodeId) || \"Node Name Not Defined\";\n                transformOperator.setMatrixText(mainViewer.model.getNodeNetMatrix(nodeId));\n            }\n        }); // End Callbacks\n        // Do not want any interaction in the overhead viewer, so we will disable all operators\n        overheadViewer.operatorManager.clear();\n        // Disable Default Handle Operator - overwriting with custom one that inherits its functionality\n        mainViewer.operatorManager.remove(Communicator.OperatorId.Handle);\n        // Create custom operators and register them with the main webviewer\n        this._instanceOp = new instanceOperator(this._viewSync);\n        this._instanceHandle = mainViewer.registerCustomOperator(this._instanceOp);\n        this._transformOp = new transformOperator(this._viewSync);\n        this._transformHandle = mainViewer.registerCustomOperator(this._transformOp);\n        this.setEventListeners();\n    } // End main Constructor\n    // Function to load models and translate them so they are loaded \n    // at the origin and above the printing plane\n    loadModel(modelName, viewer) {\n        const modelNum = viewer.model.getNodeChildren(viewer.model.getAbsoluteRootNode()).length;\n        const nodeName = \"Model-\" + (modelNum + 1);\n        const modelNodeId = viewer.model.createNode(null, nodeName);\n        this._modelList.push(modelName);\n        viewer.model.loadSubtreeFromScsFile(modelNodeId, directoryPath + \"/data/\" + modelName + \".scs\").then(() => {\n            let loadMatrix = viewer.model.getNodeNetMatrix(modelNodeId);\n            viewer.model.getNodeRealBounding(modelNodeId).then(box => {\n                loadMatrix.setTranslationComponent(-box.min.x, -box.min.y, -box.min.z);\n                viewer.model.setNodeMatrix(modelNodeId, loadMatrix, true);\n            });\n        });\n        this._viewSync.setNeedsUpdate(true);\n    }\n    setEventListeners() {\n        // We will use the main viewer to gather scene information\n        let mainViewer = this._viewerList[0];\n        document.getElementById(\"arrange-button\").onclick = () => {\n            // One plane for each viewer - need to call for each plane\n            this._transformOp.arrangeOnPlane(this._printSurfaces[0].getDimensions().planeSize).then(results => this._viewSync.syncNodeTransforms());\n        };\n        document.getElementById(\"handles-button\").onclick = () => {\n            // Need to gather the selected node IDs to know which nodes\n            // will be affected by the transformation\n            let nodeIds = [];\n            const selectionItems = mainViewer.selectionManager.getResults();\n            selectionItems.map(selectionItem => {\n                nodeIds.push(selectionItem.getNodeId());\n            });\n            // Ensure the user has made a selection before trying to add handles\n            if (selectionItems.length !== 0) {\n                this._transformOp.addHandles(nodeIds);\n                this._transformOp.showHandles();\n                mainViewer.operatorManager.push(this._transformHandle);\n            } else {\n                alert(\"Try Again. Please first select nodes from the model to transform!\");\n            }\n        };\n        document.getElementById(\"instance-button\").onclick = () => {\n            // Use the button to push and pop the operator from the operator stack\n            let elem = document.getElementById(\"instance-button\");\n            if (elem.innerHTML === \"Instance Part\") {\n                // Gather nodes to be instanced\n                let nodeIds = [];\n                const selectionItems = mainViewer.selectionManager.getResults();\n                selectionItems.map(selection => {\n                    nodeIds.push(selection.getNodeId());\n                });\n                if (selectionItems.length !== 0) {\n                    elem.innerHTML = \"Disable Instancing\";\n                    this._instanceOp.setNodesToInstance(nodeIds);\n                    // Remove the selection operator from the stack while instancing\n                    mainViewer.operatorManager.push(this._instanceHandle);\n                    mainViewer.operatorManager.remove(Communicator.OperatorId.Select);\n                    mainViewer.selectionManager.setHighlightNodeSelection(false);\n                    mainViewer.selectionManager.setHighlightFaceElementSelection(false);\n                    mainViewer.selectionManager.setPickTolerance(0);\n                } else {\n                    alert(\"Try Again. Please first select nodes from the model to instance!\");\n                }\n            } else {\n                elem.innerHTML = \"Instance Part\";\n                // Remove the instance operator from the stack and reenable selection and highlighting\n                mainViewer.selectionManager.clear();\n                mainViewer.operatorManager.remove(this._instanceHandle);\n                mainViewer.operatorManager.push(Communicator.OperatorId.Select);\n                mainViewer.selectionManager.setHighlightNodeSelection(true);\n                mainViewer.selectionManager.setHighlightFaceElementSelection(true);\n            }\n        };\n        document.getElementById(\"open-model-button\").onclick = () => {\n            // Proxy to override the default behavior of file input type\n            document.getElementById('file-input').click();\n        };\n        document.getElementById(\"file-input\").onchange = e => {\n            // Once a file has been selected by the user, use the file information to \n            // gather the associated relevant data like thumbnails\n            let fileChoice = e.target.value;\n            let filename = fileChoice.replace(/^.*[\\\\\\/]/, '');\n            let modelThumbnail = document.createElement('a');\n            let modelname = filename.split(\".\", 1)[0];\n            modelThumbnail.id = modelname;\n            modelThumbnail.href = \"\";\n            modelThumbnail.className = \"model-thumb\";\n            modelThumbnail.setAttribute(\"model\", modelname);\n            let imgPath = directoryPath + \"/data/thumbnails/\" + modelname + \".png\";\n            // Check to see if the selected model has a corresponding thumbnail made\n            fetch(imgPath).then(resp => {\n                if (resp.ok) {\n                    let modelImg = document.createElement('img');\n                    modelImg.src = imgPath;\n                    modelThumbnail.appendChild(modelImg);\n                } else {\n                    modelThumbnail.innerHTML = modelname;\n                    console.log(\"No Image for this Model was found.\");\n                }\n            });\n            document.getElementById(\"models-scroller\").appendChild(modelThumbnail);\n            // Now update the event callbacks for the thumbnails\n            const thumbnailElements = document.getElementsByClassName(\"model-thumb\");\n            for (let thumbnail of thumbnailElements) {\n                let thumbnailElement = thumbnail;\n                thumbnailElement.onclick = e => {\n                    e.preventDefault();\n                    let elem = e.currentTarget;\n                    let modelToLoad = elem.getAttribute(\"model\");\n                    // Load the model into the scene when clicked\n                    this._viewerList.map(viewer => {\n                        this.loadModel(modelToLoad, viewer);\n                    });\n                };\n            }\n            ;\n        };\n    } // End setting event handlers \n} // End main class\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ })

/******/ });