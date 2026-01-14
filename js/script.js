/**
 * js/script.js
 * 網站全域邏輯控制 (Global Logic)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 初始化商品篩選功能 (如果頁面上有篩選器的話)
    initProductFilters();

    // 2. 初始化首頁文章區塊 (如果函式已載入)
    initHomeArticles();

});

// ==========================================
// 核心功能定義
// ==========================================

/**
 * 初始化商品篩選邏輯
 * 適用於靜態 HTML 結構的篩選
 */
function initProductFilters() {
    const filterButtons = document.querySelectorAll('#portfolio-flters button');
    const productItems = document.querySelectorAll('.product-item');

    // 如果頁面上沒有篩選按鈕，直接結束，避免報錯
    if (filterButtons.length === 0) return;

    // 動畫設定 (集中管理，方便修改)
    const animConfig = {
        keyframes: [
            { opacity: 0, transform: 'scale(0.95)' },
            { opacity: 1, transform: 'scale(1)' }
        ],
        options: {
            duration: 300,
            fill: 'forwards',
            easing: 'ease-out'
        }
    };

    // 綁定點擊事件
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // 1. 切換按鈕樣式 (Active State)
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 2. 執行篩選
            const targetFilter = this.getAttribute('data-filter');
            
            productItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                // 判斷邏輯：符合分類 或 顯示全部 (all)
                // 注意：如果您的靜態 HTML 沒有 data-category="all"，則只比對分類
                if (targetFilter === 'all' || itemCategory === targetFilter) {
                    item.style.display = 'block';
                    // 只有顯示時才播放動畫
                    item.animate(animConfig.keyframes, animConfig.options);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 初始化：觸發預設 Active 按鈕的篩選
    const defaultBtn = document.querySelector('#portfolio-flters .active');
    if (defaultBtn) {
        // 模擬點擊，確保頁面載入時狀態正確
        defaultBtn.click(); 
    }
}

/**
 * 初始化首頁文章渲染
 * 依賴 js/academy.js 中的 renderHomeArticles 函式
 */
function initHomeArticles() {
    if (typeof renderHomeArticles === 'function') {
        renderHomeArticles();
    } else {
        // 開發除錯用 (上線可註解掉)
        // console.warn('renderHomeArticles 函式未找到，請確認 academy.js 是否已載入。');
    }
}