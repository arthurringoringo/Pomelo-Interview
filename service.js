const {CreateNode} = require('./model');

const response1 = (treeData) => {
    const rootNode = [];
    const nodeMap = {};
    try {
      Object.values(treeData).forEach((nodeLevel) => {
        nodeLevel.forEach((nodeData) => {
          if (!('parent_id' in nodeData)) {
            throw Error(
              'no Parent ID'
            );
          }
  
          const node = CreateNode(nodeData);
          nodeMap[node.id] = node;

          if (nodeData.parent_id === null) {
            rootNode.push(node);
          } else {
            const parentNode = nodeMap[node.parent_id];
            if (!parentNode) {
              throw Error('parentNode dosent exist');
            }
            parentNode.children.push(node);
          }
        });
      });
      return rootNode;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  module.exports = { response1 };