# Template: Module helpers
# Location: src/modules/<module_name>/helpers/<module_name>_helpers.py
# Rules: pure functions only — no FastAPI, no SQLAlchemy, no side effects


def format_module_name_item(item_id: str, name: str) -> str:
    """
    Format a module item for display.
    Replace with your actual helper logic.
    """
    return f"{item_id}: {name}"  # TODO: implement


def filter_module_name_items(items: list, query: str) -> list:
    """
    Filter items by some criteria.
    Replace with your actual helper logic.
    """
    return items  # TODO: implement
