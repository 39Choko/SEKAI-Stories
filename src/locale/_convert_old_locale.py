import json
import os
import argparse


def safe_get(data, keys):
    current = data
    for key in keys:
        if isinstance(current, dict):
            current = current.get(key)
        else:
            return None

    return current


def transform_json(source):
    old_t = source.get("tutorial", {})
    target = {
        "global": source.get("global", {}),
        "background": source.get("background", {}),
        "text": source.get("text", {}),
        "model": source.get("model", {}),
        "experimental": source.get("experimental", {}),
        "clear": source.get("clear", {}),
        "support": source.get("support", {}),
        "loadings": source.get("loadings", {}),
        "character": source.get("character", {}),
        "group": source.get("group", {}),
        "settings": source.get("settings", {}),
        "import-export": source.get("import-export", {}),
        "save": source.get("save", {}),
        "error": source.get("error", {}),
        "mental-health": source.get("mental-health", {}),
        "tutorial": {
            "initial-setup": {
                "paragraph-1": old_t.get("initialSetup1"),
                "paragraph-2": old_t.get("initialSetup2"),
            },
            "welcome": {
                "header": old_t.get("welcomeHeader"),
                "intro-header": old_t.get("welcomeIntroHeader"),
                "paragraph-1": old_t.get("welcomeIntroParagraph1"),
                "paragraph-2": old_t.get("welcomeIntroParagraph2"),
                "confirm-first-time": old_t.get("confirmFirstTime"),
            },
            "menu-navigation": {"header": old_t.get("menuNavigationHeader")},
            "background-menu": {
                "header": old_t.get("backgroundMenuHeader"),
                "select-upload": {
                    "header": old_t.get("selectUploadHeader"),
                    "paragraph": old_t.get("selectUploadParagraph"),
                },
                "split": {
                    "header": old_t.get("splitLocationHeader"),
                    "paragraph": old_t.get("splitLocationParagraph"),
                },
            },
            "text-menu": {
                "header": old_t.get("textMenuHeader"),
                "name-tag": {
                    "header": old_t.get("nameTagHeader"),
                    "paragraph": old_t.get("nameTagParagraph"),
                    "easy-switch": {
                        "header": old_t.get("easySwitchHeader"),
                        "paragraph": old_t.get("easySwitchParagraph"),
                    },
                },
                "dialogue": {
                    "header": old_t.get("dialogueHeader"),
                    "paragraph": old_t.get("dialogueParagraph"),
                },
                "scene-text": {
                    "header": old_t.get("sceneTextHeader"),
                    "paragraph": old_t.get("sceneTextParagraph"),
                },
            },
            "model-menu": {
                "header": old_t.get("modelMenuHeader"),
                "selected-layer": {
                    "header": old_t.get("selectedLayerHeader"),
                    "paragraph": old_t.get("selectedLayerParagraph"),
                    "add-model": {
                        "header": old_t.get("addModelHeader"),
                        "paragraph": old_t.get("addModelParagraph"),
                    },
                    "upload-sprite": {
                        "header": old_t.get("uploadSpriteHeader"),
                        "paragraph": old_t.get("uploadSpriteParagraph"),
                    },
                    "hide-layer": {
                        "header": old_t.get("hideLayerHeader"),
                        "paragraph": old_t.get("hideLayerParagraph"),
                    },
                    "remove-layer": {
                        "header": old_t.get("removeLayerHeader"),
                        "paragraph": old_t.get("removeLayerParagraph"),
                    },
                },
                "transform": {
                    "header": old_t.get("transformHeader"),
                    "paragraph": old_t.get("transformParagraph"),
                },
                "character": {
                    "header": old_t.get("characterHeader"),
                    "paragraph": old_t.get("characterParagraph"),
                },
                "costume": {
                    "header": old_t.get("costumeHeader"),
                    "paragraph": old_t.get("costumeParagraph"),
                },
                "emotion": {
                    "header": old_t.get("emotionHeader"),
                    "pose": {
                        "header": old_t.get("poseHeader"),
                        "paragraph": old_t.get("poseParagraph"),
                    },
                    "expression": {
                        "header": old_t.get("expressionHeader"),
                        "paragraph": old_t.get("expressionParagraph"),
                    },
                },
                "mouth": {
                    "header": old_t.get("mouthHeader"),
                    "paragraph": old_t.get("mouthParagraph"),
                },
                "live-2d": {
                    "header": old_t.get("live2dHeader"),
                    "paragraph": old_t.get("live2dParagraph"),
                    "import-export": {
                        "header": old_t.get("importExportHeader"),
                        "paragraph": old_t.get("importExportParagraph"),
                    },
                    "emotion-copy": {
                        "header": old_t.get("emotionCopyHeader"),
                        "paragraph": old_t.get("emotionCopyParagraph"),
                    },
                },
            },
            "save": {
                "header": old_t.get("saveHeader"),
                "scene-paragraph": old_t.get("sceneImportExportParagraph"),
            },
            "ending": {
                "header": old_t.get("endHeader"),
                "paragraph": old_t.get("endParagraph"),
            },
        },
    }

    return target


def main(filename: str):
    if filename.lower().endswith(".json"):
        print("You don't need the .json extension, darling.")
        return

    input_filename = f"{filename}.json"
    output_filename = f"{filename}_new.json"

    if not os.path.exists(input_filename):
        print(f"Error: {input_filename} not found.")
        return

    try:
        with open(input_filename, "r", encoding="utf-8") as f:
            source_data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return

    print("Transforming data...")
    new_data = transform_json(source_data)

    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(new_data, f, indent=4, ensure_ascii=False)

    print(f"Success! Converted file saved as {output_filename}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Convert old locale JSON to new format."
    )
    parser.add_argument(
        "--locale",
        type=str,
        required=True,
    )

    args = parser.parse_args()
    input_locale = args.locale
    if not input_locale:
        print("Please provide the input locale using --locale")
        exit(1)
    main(input_locale)
