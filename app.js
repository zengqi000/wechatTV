function showNotification(message, duration = 2000) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 16px 32px;
        border-radius: 8px;
        font-size: 16px;
        z-index: 1000;
        opacity: 1;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

const fileInput = document.getElementById('file-input');
const batchFileInput = document.getElementById('batch-file-input');
const imageContainer = document.getElementById('image-container');
const bgImage = document.getElementById('bg-image');
const uploadOverlay = document.getElementById('upload-overlay');
const uploadBtn = document.getElementById('upload-btn');
const batchUploadBtn = document.getElementById('batch-upload-btn');
const stickerMiddleInput = document.getElementById('sticker-middle');
const stickerBottomInput = document.getElementById('sticker-bottom');
const stickerMiddle = document.querySelector('.sticker-middle');
const stickerBottom = document.querySelector('.sticker-bottom');
const confirmMiddleBtn = document.getElementById('confirm-middle-btn');
const confirmBottomBtn = document.getElementById('confirm-bottom-btn');
const downloadBtn = document.getElementById('download-btn');
const singleContainer = document.getElementById('single-container');
const batchContainer = document.getElementById('batch-container');
const batchImagesContainer = document.getElementById('batch-images-container');
const backToSingleBtn = document.getElementById('back-to-single');

const batchImages = [];
const addImageBtn = document.getElementById('add-image-btn');
const transitionStyle = document.getElementById('transition-style');
const generateVideoBtn = document.getElementById('generate-video-btn');
const progressContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// 批量添加相关元素
const batchAddBtn = document.getElementById('batch-add-btn');
const batchAddModal = document.getElementById('batch-add-modal');
const modalClose = document.getElementById('modal-close');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');
const batchAddTextarea = document.getElementById('batch-add-textarea');

const sticker = document.querySelector('.sticker');
const stickerWidth = document.getElementById('sticker-width');
const stickerHeight = document.getElementById('sticker-height');
const stickerTop = document.getElementById('sticker-top');
const stickerHPadding = document.getElementById('sticker-hpadding');
const stickerFontSize = document.getElementById('sticker-font-size');
const stickerOpacity = document.getElementById('sticker-opacity');
const stickerColor = document.getElementById('sticker-color');
const stickerFontFamily = document.getElementById('sticker-font-family');
const stickerBgColor = document.getElementById('sticker-bg-color');
const stickerBorderRadius = document.getElementById('sticker-border-radius');

const widthValue = document.getElementById('width-value');
const heightValue = document.getElementById('height-value');
const topValue = document.getElementById('top-value');
const hpaddingValue = document.getElementById('hpadding-value');
const fontSizeValue = document.getElementById('font-size-value');
const opacityValue = document.getElementById('opacity-value');
const colorValue = document.getElementById('color-value');
const bgColorValue = document.getElementById('bg-color-value');
const borderRadiusValue = document.getElementById('border-radius-value');

function updateStickerStyles() {
    sticker.style.width = stickerWidth.value + 'px';
    sticker.style.height = stickerHeight.value + 'px';
    sticker.style.bottom = stickerTop.value + 'px';
    sticker.style.left = stickerHPadding.value + 'px';
    sticker.style.right = stickerHPadding.value + 'px';
    sticker.style.borderRadius = stickerBorderRadius.value + 'px';
    
    const bgColor = hexToRgb(stickerBgColor.value);
    sticker.style.background = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${stickerOpacity.value / 100})`;
    
    document.querySelectorAll('.sticker-part').forEach(el => {
        el.style.fontSize = stickerFontSize.value + 'px';
        el.style.color = stickerColor.value;
        el.style.fontFamily = stickerFontFamily.value;
    });
    
    document.querySelectorAll('.sticker-bottom-main').forEach(el => {
        el.style.fontSize = stickerFontSize.value + 'px';
        el.style.fontFamily = stickerFontFamily.value;
    });
    
    document.querySelectorAll('.sticker-bottom-secondary').forEach(el => {
        el.style.fontSize = (parseInt(stickerFontSize.value) * 0.78) + 'px';
        el.style.fontFamily = stickerFontFamily.value;
    });
    
    widthValue.textContent = stickerWidth.value + 'px';
    heightValue.textContent = stickerHeight.value + 'px';
    topValue.textContent = stickerTop.value + 'px';
    hpaddingValue.textContent = stickerHPadding.value + 'px';
    fontSizeValue.textContent = stickerFontSize.value + 'px';
    opacityValue.textContent = stickerOpacity.value + '%';
    colorValue.textContent = stickerColor.value;
    bgColorValue.textContent = stickerBgColor.value;
    borderRadiusValue.textContent = stickerBorderRadius.value + 'px';
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
}

stickerWidth.addEventListener('input', updateStickerStyles);
stickerHeight.addEventListener('input', updateStickerStyles);
stickerTop.addEventListener('input', updateStickerStyles);
stickerHPadding.addEventListener('input', updateStickerStyles);
stickerFontSize.addEventListener('input', updateStickerStyles);
stickerOpacity.addEventListener('input', updateStickerStyles);
stickerColor.addEventListener('input', updateStickerStyles);
stickerFontFamily.addEventListener('change', updateStickerStyles);
stickerBgColor.addEventListener('input', updateStickerStyles);
stickerBorderRadius.addEventListener('input', updateStickerStyles);

updateStickerStyles();

const sizeTitleBtn = document.getElementById('size-title-btn');
const sizeContent = document.getElementById('size-content');
let isSizeExpanded = false;

sizeTitleBtn.addEventListener('click', function() {
    isSizeExpanded = !isSizeExpanded;
    if (isSizeExpanded) {
        sizeContent.classList.remove('collapsed');
        sizeTitleBtn.innerHTML = '📐 贴纸尺寸设置 ▼';
    } else {
        sizeContent.classList.add('collapsed');
        sizeTitleBtn.innerHTML = '📐 贴纸尺寸设置 ▲';
    }
});

stickerMiddleInput.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        this.select();
    }
});

stickerBottomInput.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        this.select();
    }
});

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            // 直接加载用户上传的图片，保留原始背景
            imageContainer.src = event.target.result;
            imageContainer.style.display = 'block';
            uploadOverlay.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

uploadBtn.addEventListener('click', function() {
    fileInput.click();
});

confirmMiddleBtn.addEventListener('click', function() {
    stickerMiddle.textContent = stickerMiddleInput.value || '在这里输入文案';
});

confirmBottomBtn.addEventListener('click', function() {
    const text = stickerBottomInput.value || 'A：标题\nB：副标题';
    const parts = text.split('\n');
    const mainText = parts[0]?.replace(/^[AB]：?\s*/, '') || '主标题';
    const secondaryText = parts.slice(1).join('\n').replace(/^[AB]：?\s*/, '') || '副标题';
    
    const stickerBottomMain = stickerBottom.querySelector('.sticker-bottom-main');
    const stickerBottomSecondary = stickerBottom.querySelector('.sticker-bottom-secondary');
    
    if (stickerBottomMain) {
        stickerBottomMain.textContent = mainText;
    }
    if (stickerBottomSecondary) {
        stickerBottomSecondary.textContent = secondaryText;
    }
});

downloadBtn.addEventListener('click', function() {
    const singleContainer = document.getElementById('single-container');
    const batchContainer = document.getElementById('batch-container');
    
    // 截取整个容器（包含底色图、贴纸文案和封面）
    const container = singleContainer;
    
    showNotification('正在添加图片...', 1000);
    
    // 使用html2canvas截取整个容器
    html2canvas(container, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2,
        logging: false,
        imageTimeout: 0,
        scrollX: 0,
        scrollY: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        ignoreElements: function(element) {
            return element.classList.contains('upload-overlay');
        }
    }).then(function(canvas) {
        const imageData = canvas.toDataURL('image/png');
        
        batchImages.push({
            name: 'screenshot_' + Date.now() + '.png',
            data: imageData
        });
        
        if (batchContainer.style.display === 'block') {
            updateBatchImagesContainer();
        }
        
        showNotification('图片添加成功！', 1000);
    }).catch(function(error) {
        console.error('截图失败:', error);
        showNotification('截图失败，请重试', 2000);
    });
});




const tutorialBtn = document.getElementById('tutorial-btn');
tutorialBtn.addEventListener('click', function() {
    const tutorialContent = `工具使用教程：

1、设置背景图，点【设置封面】，上传一张照片；

2、设置文案：在贴纸输入框输入第一张图片的文案，确定后点【添加图片】按钮，图片会自动保存；

3、重复步骤1，把每张图片的文案都添加；

4、查看图片：点【进入图片管理页面】，可看到已添加的图片，可删除或添加新图片，拖动图片可更换位置；

不要删除文件夹的文件，定期更新，最新工具可添加v；Xiaoqi36886


微信视频号注意事项：

1、养号：每天刷几次，搜索框输入你想要带的书籍，搜索后多关注多收藏。

2、实名认证并开通橱窗；

3、选品，选择你要推广的书籍；

4、多个视频号同时发布不同的视频。

5、有一个视频爆的时候，可以再发一次相同的文案视频，同样也会爆。


文案来源：

1、前期：刷同行视频，找点赞量高的视频，复制她的文案直接用，所有文案保存在excel中；

2、中期：把excel给豆包，让开头结尾不变，把中间的内容改掉。

3、后期：把爆光多的视频文案整理在一起，丢给AI，让生成类似的文案，自己再适当的修改一下。`;
    
    const blob = new Blob([tutorialContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '使用教程.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});

batchUploadBtn.addEventListener('click', function() {
    singleContainer.style.display = 'none';
    batchContainer.style.display = 'block';
    updateBatchImagesContainer();
});

backToSingleBtn.addEventListener('click', function() {
    batchContainer.style.display = 'none';
    singleContainer.style.display = 'block';
});

addImageBtn.addEventListener('click', function() {
    batchFileInput.click();
});

batchFileInput.addEventListener('change', function(e) {
    const files = e.target.files;
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = function(event) {
                batchImages.push({
                    name: file.name,
                    data: event.target.result
                });
                updateBatchImagesContainer();
            };
            reader.readAsDataURL(file);
        }
    }
});

function updateBatchImagesContainer() {
    if (batchImages.length === 0) {
        batchImagesContainer.innerHTML = '<p style="color: #999;">点击或拖拽上传图片</p>';
        batchImagesContainer.classList.add('empty');
        batchImagesContainer.classList.remove('has-images');
        batchImagesContainer.addEventListener('click', triggerBatchFileInput);
        batchImagesContainer.addEventListener('dragover', handleDragOver);
        batchImagesContainer.addEventListener('drop', handleDrop);
    } else {
        batchImagesContainer.innerHTML = '';
        batchImagesContainer.classList.remove('empty');
        batchImagesContainer.classList.add('has-images');
        batchImagesContainer.removeEventListener('click', triggerBatchFileInput);
        batchImagesContainer.removeEventListener('dragover', handleDragOver);
        batchImagesContainer.removeEventListener('drop', handleDrop);
        
        batchImages.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'batch-image-item';
            item.draggable = true;
            item.dataset.index = index;
            item.innerHTML = `
                <img src="${img.data}" alt="${img.name}">
                <button class="remove-btn" data-index="${index}">×</button>
            `;
            batchImagesContainer.appendChild(item);
        });
        
        document.querySelectorAll('.batch-image-item').forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragover', handleItemDragOver);
            item.addEventListener('drop', handleItemDrop);
            item.addEventListener('dragend', handleDragEnd);
        });
        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                batchImages.splice(index, 1);
                updateBatchImagesContainer();
            });
        });
    }
}

let draggedIndex = -1;

function handleDragStart(e) {
    const item = e.target.closest('.batch-image-item');
    if (item) {
        draggedIndex = parseInt(item.dataset.index);
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }
}

function handleItemDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const item = e.target.closest('.batch-image-item');
    if (item) {
        item.classList.add('drag-over');
    }
}

function handleItemDrop(e) {
    e.preventDefault();
    const item = e.target.closest('.batch-image-item');
    if (item) {
        item.classList.remove('drag-over');
        
        const dropIndex = parseInt(item.dataset.index);
        if (draggedIndex !== -1 && draggedIndex !== dropIndex) {
            const draggedImage = batchImages.splice(draggedIndex, 1)[0];
            batchImages.splice(dropIndex, 0, draggedImage);
            updateBatchImagesContainer();
        }
    }
    draggedIndex = -1;
}

function handleDragEnd(e) {
    const item = e.target.closest('.batch-image-item');
    if (item) {
        item.classList.remove('dragging');
    }
    document.querySelectorAll('.batch-image-item').forEach(item => {
        item.classList.remove('drag-over');
    });
    draggedIndex = -1;
}

function triggerBatchFileInput() {
    batchFileInput.click();
}

function handleDragOver(e) {
    e.preventDefault();
    batchImagesContainer.style.borderColor = '#20c997';
}

function handleDrop(e) {
    e.preventDefault();
    batchImagesContainer.style.borderColor = '#ccc';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    batchImages.push({
                        name: file.name,
                        data: event.target.result
                    });
                    updateBatchImagesContainer();
                };
                reader.readAsDataURL(file);
            }
        }
    }
}

// 确保在 DOM 完全加载后初始化
document.addEventListener('DOMContentLoaded', function() {
    updateBatchImagesContainer();
});

function updateProgress(current, total) {
    const percentage = Math.round((current / total) * 100);
    progressFill.style.width = percentage + '%';
    progressText.textContent = percentage + '%';
}

async function generateVideo() {
    if (batchImages.length < 2) {
        showNotification('请至少添加2张图片', 2000);
        return;
    }

    progressContainer.style.display = 'flex';
    updateProgress(0, 100);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    const fps = 30;
    const frameDuration = 1000 / fps;
    const imageDuration = 3000;
    const transitionDuration = 500;

    const totalFrames = batchImages.length * (imageDuration / (1000 / fps)) + 
                       (batchImages.length - 1) * (transitionDuration / (1000 / fps));
    let currentFrame = 0;

    const stream = canvas.captureStream(fps);
    
    const mimeType = 'video/mp4;codecs=avc1';
    const isMp4Supported = MediaRecorder.isTypeSupported(mimeType);
    
    const finalMimeType = isMp4Supported ? mimeType : 'video/webm;codecs=vp9';
    
    const recorder = new MediaRecorder(stream, {
        mimeType: finalMimeType,
        videoBitsPerSecond: 8000000
    });

    const chunks = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: finalMimeType });
        const videoFileName = 'video_' + Date.now() + (isMp4Supported ? '.mp4' : '.webm');
        
        progressContainer.style.display = 'none';
        updateProgress(0, 100);
        
        // 创建保存按钮，让用户主动点击来保存视频（符合浏览器安全策略）
        showSaveVideoButton(blob, videoFileName);
    };
    
    // 显示保存视频按钮
    function showSaveVideoButton(blob, fileName) {
        showNotification('视频生成成功！', 1500);
        
        // 检查是否已有保存按钮
        let saveBtn = document.getElementById('save-video-btn');
        if (!saveBtn) {
            saveBtn = document.createElement('button');
            saveBtn.id = 'save-video-btn';
            saveBtn.className = 'btn btn-primary';
            saveBtn.style.marginTop = '10px';
            saveBtn.textContent = '保存视频';
            document.querySelector('.batch-actions').appendChild(saveBtn);
        }
        
        saveBtn.style.display = 'block';
        saveBtn.onclick = async () => {
            saveBtn.disabled = true;
            saveBtn.textContent = '保存中...';
            
            if ('showSaveFilePicker' in window) {
                try {
                    const handle = await window.showSaveFilePicker({
                        suggestedName: fileName,
                        types: [
                            {
                                description: 'MP4视频',
                                accept: { 'video/mp4': ['.mp4'] }
                            },
                            {
                                description: 'WebM视频',
                                accept: { 'video/webm': ['.webm'] }
                            }
                        ]
                    });
                    
                    const writable = await handle.createWritable();
                    await writable.write(blob);
                    await writable.close();
                    
                    showNotification('视频保存成功！', 2000);
                    saveBtn.style.display = 'none';
                } catch (err) {
                    console.error('保存失败或用户取消:', err);
                    downloadVideoFallback(blob, fileName);
                    saveBtn.style.display = 'none';
                }
            } else {
                downloadVideoFallback(blob, fileName);
                saveBtn.style.display = 'none';
            }
            
            saveBtn.disabled = false;
            saveBtn.textContent = '保存视频';
        };
    }

    function downloadVideoFallback(blob, fileName) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showNotification('视频已下载！', 2000);
    }

    recorder.start();

    for (let i = 0; i < batchImages.length; i++) {
        const currentImg = new Image();
        currentImg.crossOrigin = 'anonymous';
        await new Promise((resolve) => {
            currentImg.onload = resolve;
            currentImg.src = batchImages[i].data;
        });

        const imageFrames = imageDuration / (1000 / fps);
        for (let j = 0; j < imageFrames; j++) {
            // 直接绘制整个截图（包括留白），不进行缩放
            ctx.drawImage(currentImg, 0, 0, width, height);
            await new Promise(r => setTimeout(r, frameDuration));
            currentFrame++;
            updateProgress(currentFrame, totalFrames);
        }

        if (i < batchImages.length - 1) {
            const nextImg = new Image();
            nextImg.crossOrigin = 'anonymous';
            await new Promise((resolve) => {
                nextImg.onload = resolve;
                nextImg.src = batchImages[i + 1].data;
            });

            currentFrame = await drawTransition(ctx, currentImg, nextImg, width, height, transitionDuration, fps, totalFrames, currentFrame);
        }
    }

    setTimeout(() => {
        recorder.stop();
    }, 500);
}

async function drawTransition(ctx, currentImg, nextImg, width, height, duration, fps, totalFrames, currentFrame) {
    const style = transitionStyle.value;
    const frames = Math.floor(duration / (1000 / fps));
    const frameDuration = duration / frames;

    for (let frame = 0; frame < frames; frame++) {
        const progress = frame / frames;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        switch (style) {
            case 'slide-left':
                drawSlideLeft(ctx, currentImg, nextImg, width, height, progress);
                break;
            case 'slide-right':
                drawSlideRight(ctx, currentImg, nextImg, width, height, progress);
                break;
            case 'slide-up':
                drawSlideUp(ctx, currentImg, nextImg, width, height, progress);
                break;
            case 'slide-down':
                drawSlideDown(ctx, currentImg, nextImg, width, height, progress);
                break;
            case 'fade':
                drawFade(ctx, currentImg, nextImg, width, height, progress);
                break;
            case 'flip':
                drawFlip(ctx, currentImg, nextImg, width, height, progress);
                break;
            case 'zoom':
                drawZoom(ctx, currentImg, nextImg, width, height, progress);
                break;
            default:
                drawSlideLeft(ctx, currentImg, nextImg, width, height, progress);
        }
        
        await new Promise(r => setTimeout(r, frameDuration));
        currentFrame++;
        updateProgress(currentFrame, totalFrames);
    }
    
    return currentFrame;
}

function getImageDrawParams(img, width, height) {
    const imgRatio = img.width / img.height;
    const containerRatio = width / height;
    
    if (imgRatio > containerRatio) {
        return {
            drawWidth: width,
            drawHeight: width / imgRatio,
            drawX: 0,
            drawY: (height - width / imgRatio) / 2
        };
    } else {
        return {
            drawWidth: height * imgRatio,
            drawHeight: height,
            drawX: (width - height * imgRatio) / 2,
            drawY: 0
        };
    }
}

function drawSlideLeft(ctx, currentImg, nextImg, width, height, progress) {
    ctx.drawImage(currentImg, width * progress, 0, width, height);
    ctx.drawImage(nextImg, width * (progress - 1), 0, width, height);
}

function drawSlideRight(ctx, currentImg, nextImg, width, height, progress) {
    ctx.drawImage(currentImg, -width * progress, 0, width, height);
    ctx.drawImage(nextImg, width * (1 - progress), 0, width, height);
}

function drawSlideUp(ctx, currentImg, nextImg, width, height, progress) {
    ctx.drawImage(currentImg, 0, height * progress, width, height);
    ctx.drawImage(nextImg, 0, height * (progress - 1), width, height);
}

function drawSlideDown(ctx, currentImg, nextImg, width, height, progress) {
    ctx.drawImage(currentImg, 0, -height * progress, width, height);
    ctx.drawImage(nextImg, 0, height * (1 - progress), width, height);
}

function drawFade(ctx, currentImg, nextImg, width, height, progress) {
    ctx.globalAlpha = 1 - progress;
    ctx.drawImage(currentImg, 0, 0, width, height);
    ctx.globalAlpha = progress;
    ctx.drawImage(nextImg, 0, 0, width, height);
    ctx.globalAlpha = 1;
}

function drawFlip(ctx, currentImg, nextImg, width, height, progress) {
    const centerX = width / 2;
    const centerY = height / 2;
    const rotation = progress * Math.PI;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    
    ctx.save();
    ctx.rotate(rotation);
    ctx.globalAlpha = Math.cos(rotation);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(currentImg, 0, 0, width, height);
    ctx.restore();
    
    ctx.save();
    ctx.rotate(rotation - Math.PI);
    ctx.globalAlpha = Math.abs(Math.cos(rotation - Math.PI));
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(nextImg, 0, 0, width, height);
    ctx.restore();
    
    ctx.restore();
}

function drawZoom(ctx, currentImg, nextImg, width, height, progress) {
    const zoomOut = 1 + progress * 0.3;
    const zoomIn = 1 - progress * 0.3;
    
    ctx.save();
    ctx.globalAlpha = 1 - progress;
    ctx.translate(width / 2, height / 2);
    ctx.scale(zoomOut, zoomOut);
    ctx.drawImage(currentImg, -width / 2, -height / 2, width, height);
    ctx.restore();
    
    ctx.save();
    ctx.globalAlpha = progress;
    ctx.translate(width / 2, height / 2);
    ctx.scale(zoomIn, zoomIn);
    ctx.drawImage(nextImg, -width / 2, -height / 2, width, height);
    ctx.restore();
}

generateVideoBtn.addEventListener('click', generateVideo);

// 批量添加按钮事件
batchAddBtn.addEventListener('click', function() {
    batchAddModal.style.display = 'flex';
    batchAddTextarea.value = '';
});

// 关闭弹窗
function closeModal() {
    batchAddModal.style.display = 'none';
    batchAddTextarea.value = '';
}

modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);

// 点击弹窗外部关闭
batchAddModal.addEventListener('click', function(e) {
    if (e.target === batchAddModal) {
        closeModal();
    }
});

// 确定添加
modalConfirm.addEventListener('click', async function() {
    const text = batchAddTextarea.value.trim();
    if (!text) {
        showNotification('请输入文案内容');
        return;
    }

    // 解析文案格式：【内容】（支持多行）
    const textContent = batchAddTextarea.value;
    
    // 使用【】分割内容
    const parts = textContent.split('【');
    const items = [];
    
    for (let i = 1; i < parts.length; i++) {
        let content = parts[i];
        
        // 找到结束位置
        const endIndex = content.indexOf('】');
        if (endIndex !== -1) {
            content = content.substring(0, endIndex);
        }
        
        // 清理内容：去除多余空行
        content = content
            .split('\n')
            .map(line => line.trim())
            .filter((line, index, arr) => {
                // 保留所有非空行
                return line !== '';
            })
            .join('\n');
        
        if (content.trim()) {
            items.push({
                index: i,
                content: content.trim()
            });
        }
    }

    if (items.length === 0) {
        showNotification('请按照【】格式输入内容');
        return;
    }

    // 按序号排序
    items.sort((a, b) => a.index - b.index);

    closeModal();
    
    // 确保显示单张预览页面用于截图
    if (batchContainer.style.display === 'block') {
        batchContainer.style.display = 'none';
        singleContainer.style.display = 'block';
    }
    
    // 检查是否已经上传了封面图片
    if (!imageContainer.src.startsWith('data:')) {
        showNotification('请先上传封面图片！', 3000);
        return;
    }
    
    showNotification('开始批量添加...');

    // 依次添加每张图片
    for (const item of items) {
        // 1. 更新文案输入框
        stickerMiddleInput.value = item.content;
        
        // 2. 点击确定按钮更新预览
        confirmMiddleBtn.click();
        
        // 3. 等待 DOM 更新
        await new Promise(r => setTimeout(r, 100));
        
        // 4. 生成截图并添加到列表
        await new Promise((resolve) => {
            const container = singleContainer; // 始终使用单张预览页面
            
            if (!container) {
                console.error('容器不存在');
                showNotification('容器不存在', 2000);
                resolve();
                return;
            }
            
            console.log('正在截图第', item.index, '张图片');
            
            // 截图前保存原始状态
            const originalSrc = imageContainer.src;
            const originalBackground = imageContainer.style.backgroundImage;
            
            // 如果图片不是 data URL，先隐藏图片
            if (!imageContainer.src.startsWith('data:')) {
                imageContainer.style.display = 'none';
            }
            imageContainer.style.backgroundImage = 'none';
            
            html2canvas(container, {
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                scale: 2,
                logging: true,
                timeout: 10000
            }).then(function(canvas) {
                // 恢复原始状态
                imageContainer.src = originalSrc;
                imageContainer.style.display = 'block';
                imageContainer.style.backgroundImage = originalBackground;
                if (!canvas) {
                    console.error('canvas 为空');
                    showNotification('截图失败', 2000);
                    resolve();
                    return;
                }
                
                console.log('截图成功，尺寸:', canvas.width, 'x', canvas.height);
                
                // 保持原始截图尺寸，不进行缩放
                const outputCanvas = document.createElement('canvas');
                outputCanvas.width = canvas.width;
                outputCanvas.height = canvas.height;
                const outputCtx = outputCanvas.getContext('2d');
                
                outputCtx.fillStyle = '#ffffff';
                outputCtx.fillRect(0, 0, canvas.width, canvas.height);
                
                // 直接绘制，不缩放
                outputCtx.drawImage(canvas, 0, 0);
                
                const imageData = outputCanvas.toDataURL('image/png');
                
                batchImages.push({
                    name: 'image_' + item.index + '_' + Date.now() + '.png',
                    data: imageData
                });
                
                console.log('已添加到列表，当前列表长度:', batchImages.length);
                
                // 每次添加后都更新图片列表
                updateBatchImagesContainer();
                
                resolve();
            }).catch(function(error) {
                console.error('截图失败:', error);
                showNotification('第' + item.index + '张图片添加失败: ' + error.message, 2000);
                resolve();
            });
        });
        
        // 等待一下，确保 DOM 更新完成
        await new Promise(r => setTimeout(r, 200));
    }

    showNotification(`已成功添加 ${items.length} 张图片！`);
});
