document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');

    // Use requestAnimationFrame for smoother animation
    let animationFrameId;
    let lastTime = 0;
    const fps = 30; // Limit FPS for better performance
    const interval = 1000 / fps;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        initializeDrops(); // Reinitialize drops on resize
    });

    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];

    function initializeDrops() {
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(0).map(() => Math.random() * canvas.height / fontSize);
    }

    initializeDrops();
    
    const colors = [
        'rgba(0, 255, 140, 0.1)',
        'rgba(0, 255, 140, 0.15)',
        'rgba(0, 255, 140, 0.2)'
    ];

    function draw(currentTime) {
        animationFrameId = requestAnimationFrame(draw);

        // Throttle the frame rate
        const deltaTime = currentTime - lastTime;
        if (deltaTime < interval) return;

        lastTime = currentTime - (deltaTime % interval);

        // More transparent fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px monospace`;
        
        for(let i = 0; i < drops.length; i++) {
            const text = Math.random() > 0.5 ? '1' : '0';
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Use more subtle colors without glow effects
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillText(text, x, y);

            if(y > canvas.height && Math.random() > 0.99) {
                drops[i] = 0;
            } else {
                drops[i] += 0.4; // Slower falling speed
            }
        }
    }

    // Start the animation
    animationFrameId = requestAnimationFrame(draw);

    // Clean up on page unload
    window.addEventListener('unload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
}); 