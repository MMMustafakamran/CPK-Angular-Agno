from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.models.openai import OpenAIChat
from agno.os import AgentOS
from agno.os.interfaces.agui import AGUI
from agno.tools import tool
from pathlib import Path
from dotenv import load_dotenv
import json
import os
import time
from typing import TypedDict
import random
from agno.tools import tool

#load_dotenv(Path(__file__).resolve().parent.parent / ".env")
load_dotenv()

@tool(name="getWeather")
def get_weather(city: str):
    """
    Get the weather for a given city.
    """
    # Measured without this sleep, TOOL_CALL_START -> TOOL_CALL_RESULT took 23ms
    # — about one frame — so the renderer's "in-progress"/"executing" branch was
    # never painted and only the completed card was ever visible. A real weather
    # API would take this long anyway; the delay is what makes the tool
    # renderer's non-complete states observable in the harness.
    # Set WEATHER_TOOL_DELAY=0 to remove it.
    time.sleep(float(os.getenv("WEATHER_TOOL_DELAY", "1.5")))
    return f"The weather for {city} is 70 degrees."



agent = Agent(
    model=OpenAIChat(id="gpt-4o"),
    # Matches the WorkspaceState shape the shared-state guide's component reads.
    session_state={"notes": [], "priority": "normal"},
    add_session_state_to_context=True,    # let the model see it
    enable_agentic_state=True,            # let the model update it via tools
    description="A helpful assistant that can answer questions and provide information.",
    instructions=(
        "Be helpful and friendly. Format your responses using markdown where appropriate. "
        "When an action is consequential or destructive, call the requestApproval "
        "frontend tool and wait for the user's decision before proceeding. "
    ),
    tools=[get_weather],
    db=SqliteDb(db_file="agno.db"),
)

agent_os = AgentOS(
    agents=[agent],
    interfaces=[AGUI(agent=agent)],
    cors_allowed_origins=[
        "http://localhost:3000",
        "http://localhost:4200",
    ],
)
app = agent_os.get_app()

if __name__ == "__main__":
    agent_os.serve(app="main:app", port=8000, reload=True)

