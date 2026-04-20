# Template: Module __init__.py
# Location: src/modules/<module_name>/__init__.py
# Exports the router so it can be imported cleanly in main.py or app/router.py

from .module_name_router import router as module_name_router

__all__ = ["module_name_router"]

# Registration in main.py:
# from app.modules.module_name import module_name_router
# app.include_router(module_name_router, prefix="/api/v1")
