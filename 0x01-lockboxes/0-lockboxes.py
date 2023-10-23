#!/usr/bin/python3
"""Lockboxes module."""


def canUnlockAll(boxes):
    # Initialize a set to keep track of visited boxes
    visited = set()
    # Start DFS from the first box (box 0)
    stack = [0]

    # Perform DFS traversal
    while stack:
        current_box = stack.pop()
        visited.add(current_box)

        # Check keys in the current box
        for key in boxes[current_box]:
            # If the key opens a new box and that box is not visited yet, add it to the stack
            if key < len(boxes) and key not in visited:
                stack.append(key)

    # If all boxes have been visited, return True; otherwise, return False
    return len(visited) == len(boxes)
