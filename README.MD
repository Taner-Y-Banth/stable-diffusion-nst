cd stable-diffusion
conda env create -f environment.yaml
conda activate ldm
mkdir -p models/ldm/stable-diffusion-v1/
ln -s ../models/sd-v1-4.ckpt models/ldm/stable-diffusion-v1/model.ckpt

python scripts/txt2img.py --prompt "rick astley" --W 320 --H 320